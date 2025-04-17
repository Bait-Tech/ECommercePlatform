namespace ECommercePlatform.Server.DTOs.Order
{
    public class OrderDTO
    {
        public int? OrderID { get; set; }
        public required string UserName {  get; set; }
        public required string Location { get; set; }
        public required string PhoneNumber { get; set; }
        public bool IsConfirmed { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? ConfirmDate { get; set; }
        public required List<ProductsOrderDTO> ProductsOrderDTO { get; set; }
    }
}
