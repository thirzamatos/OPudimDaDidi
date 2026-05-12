using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var products = await _context.Products.Where(p => p.Ativo).ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Buscar(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) 
                return NotFound();
            return Ok(product);
        }

        [Authorize(Roles = "vendedor")]
        [HttpPost]
        public async Task<IActionResult> Criar(ProductDTO dto)
        {
            var product = new Product
            {
                Nome = dto.Nome,
                Sabor = dto.Sabor,
                Tamanho = dto.Tamanho,
                Descricao = dto.Descricao,
                Preco = dto.Preco,
                ImagemUrl = dto.ImagemUrl
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }

        [Authorize(Roles = "vendedor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Editar(int id, ProductDTO dto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            product.Nome = dto.Nome;
            product.Sabor = dto.Sabor;
            product.Tamanho = dto.Tamanho;
            product.Descricao = dto.Descricao;
            product.Preco = dto.Preco;
            product.ImagemUrl = dto.ImagemUrl;

            await _context.SaveChangesAsync();
            return Ok(product);
        }

        [Authorize(Roles = "vendedor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            product.Ativo = false;
            await _context.SaveChangesAsync();
            return Ok("Produto desativado!");
        }
    }
}
