namespace api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Sabor { get; set; } = string.Empty;
        public string Tamanho { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public string ImagemUrl { get; set; } = string.Empty;
        public bool Ativo { get; set; } = true;
    }
}
