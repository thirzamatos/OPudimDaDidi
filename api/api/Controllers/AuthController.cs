using api.DTOs;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar(RegisterDTO dto)
        {
            var existente = await _authService.BuscarPorEmail(dto.Email);
            if (existente != null)
                return BadRequest("Email já cadastrado!");

            var user = await _authService.Registrar(dto.Nome, dto.Email, dto.Senha);
            var token = _authService.GerarToken(user);

            return Ok(new AuthResponseDTO
            {
                Token = token,
                Nome = user.Nome,
                Email = user.Email,
                Role = user.Role
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await _authService.BuscarPorEmail(dto.Email);
            if (user == null)
                return Unauthorized("Email ou senha inválidos!");

            var senhaHash = _authService.HashSenha(dto.Senha);
            if (user.SenhaHash != senhaHash)
                return Unauthorized("Email ou senha inválidos!");

            var token = _authService.GerarToken(user);

            return Ok(new AuthResponseDTO
            {
                Token = token,
                Nome = user.Nome,
                Email = user.Email,
                Role = user.Role
            });
        }
    }
}
