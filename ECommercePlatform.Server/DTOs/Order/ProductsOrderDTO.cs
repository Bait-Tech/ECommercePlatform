namespace ECommercePlatform.Server.DTOs.Order
{
    public class ProductsOrderDTO
    {
        public int ProductID { get; set; }
        public int ProductQTY {  get; set; }

        public string? ProductName { get; set; }
        public decimal? ProductPrice { get; set; }
        public string? ProductImage { get; set; }
    }
}
