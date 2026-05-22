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
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        private async Task<Cart> GetOrCreateCart(int userId)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            return cart;
        }

        [HttpGet]
        public async Task<IActionResult> VerCarrinho()
        {
            var cart = await GetOrCreateCart(GetUserId());
            return Ok(cart);
        }

        [HttpPost]
        public async Task<IActionResult> AdicionarItem(CartItemDTO dto)
        {
            var cart = await GetOrCreateCart(GetUserId());

            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null) return NotFound("Produto não encontrado.");

            var itemExistente = cart.Items.FirstOrDefault(i => i.ProductId == dto.ProductId);
            if (itemExistente != null)
            {
                itemExistente.Quantidade += dto.Quantidade;
            }
            else
            {
                cart.Items.Add(new CartItem
                {
                    CartId = cart.Id,
                    ProductId = dto.ProductId,
                    Quantidade = dto.Quantidade
                });
            }

            await _context.SaveChangesAsync();
            return Ok(cart);
        }

        [HttpDelete("remover/{productId}")]
        public async Task<IActionResult> RemoverItem(int productId)
        {
            var cart = await GetOrCreateCart(GetUserId());

            var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);
            if (item == null) return NotFound("Item não encontrado no carrinho.");

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            var cartAtualizado = await GetOrCreateCart(GetUserId());
            return Ok(cartAtualizado);
        }

        [HttpDelete("limpar")]
        public async Task<IActionResult> LimparCarrinho()
        {
            var cart = await GetOrCreateCart(GetUserId());
            _context.CartItems.RemoveRange(cart.Items);
            await _context.SaveChangesAsync();
            return Ok("Carrinho limpo.");
        }
    }
}