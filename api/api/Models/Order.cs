namespace api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "pendente";
        public decimal Total { get; set; }
        public string Endereco { get; set; } = string.Empty;
        public string FormaPagamento { get; set; } = string.Empty;
        public List<OrderItem> Items { get; set; } = new();
    }
}
