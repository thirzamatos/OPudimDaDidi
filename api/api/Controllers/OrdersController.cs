using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CriarPedido(CriarPedidoDTO dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var order = new Order
            {
                UserId = userId,
                Status = "pendente",
                Endereco = dto.Endereco,
                FormaPagamento = dto.FormaPagamento
            };
            decimal total = 0;

            foreach(var item in dto.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null)
                    return BadRequest($"Produto {item.ProductId} não encontrado!");

                var orderItem = new OrderItem
                {
                    ProductId = product.Id,
                    Quantidade = item.Quantidade,
                    PrecoUnitario = product.Preco
                };

                total += product.Preco * item.Quantidade;
                order.Items.Add(orderItem);
            }

            order.Total = total;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }

        [HttpGet("meus-pedidos")]
        public async Task<IActionResult> MeusPedidos()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var orders = await _context.Orders.Include(o => o.Items).ThenInclude(i => i.Product).Where(o => o.UserId == userId).OrderByDescending(o => o.CriadoEm).ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Detalhe(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var order = await _context.Orders.Include(o => o.Items).ThenInclude(i => i.Product).FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

            if (order == null)
                return NotFound();

            return Ok(order);
        }

        [Authorize(Roles = "vendedor")]
        [HttpGet]
        public async Task<IActionResult> TodosPedidos()
        {
            var orders = await _context.Orders.Include(o => o.User).Include(o => o.Items).ThenInclude(i => i.Product).OrderByDescending(o => o.CriadoEm).ToListAsync();

            return Ok(orders);
        }

        [Authorize(Roles = "vendedor")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> AtualizarStatus(int id, [FromBody] StatusDTO dto)
        {
            var statusValidos = new[] { "pendente", "confirmado", "em preparo", "entregue", "cancelado" };
            if (!statusValidos.Contains(dto.Status))
                return BadRequest("Status inválido!");

            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound();

            order.Status = dto.Status;
            await _context.SaveChangesAsync();

            return Ok(order);
        }
    }
}
