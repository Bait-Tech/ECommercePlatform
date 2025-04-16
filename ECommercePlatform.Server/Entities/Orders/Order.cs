using System.ComponentModel.DataAnnotations;

namespace ECommercePlatform.Server.Entities.Orders
{
    public class Order
    {
        [Key]
        public int ID {  get; set; }    
      
        public DateTime CreateDate { get; set; }

        public DateTime? ConfirmDate { get; set; }
    
        public bool IsConfirmed {  get; set; }

        public decimal Total {  get; set; }
        
        public required string Location {  get; set; }
        public required string PhoneNumber { get; set; }
        public required string UserName {  get; set; }
        
        public ICollection<ProductsOrders>? ProductsOrders { get; set; }
    }
}