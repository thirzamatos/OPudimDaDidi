namespace api.DTOs
{
    public class RegisterDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }

    public class LoginDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }

    public class  AuthResponseDTO
    {
        public string Token { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }

    public class  ProductDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string Sabor { get; set; } = string.Empty;
        public string Tamanho { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public string ImagemUrl { get; set; } = string.Empty;
    }

    public class CriarPedidoDTO
    {
        public List<ItemPedidoDTO> Items { get; set; } = new();
    }
    
    public class ItemPedidoDTO
    {
        public int ProductId { get; set; }
        public int Quantidade { get; set; }
    }

    public class CartItemDTO
    {
        public int ProductId { get; set; }
        public int Quantidade { get; set; }
    }
}
