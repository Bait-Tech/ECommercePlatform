using ECommercePlatform.Server.Entities.Main;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommercePlatform.Server.Entities.Orders
{
    public class ProductsOrders
    {
        [Key]
        public int ID { get; set; }
        public decimal UnitPrice { get; set; }
        public int QTY { get; set; }
        public int OrderID { get; set; }

        [ForeignKey("OrderID")]
        public Order? Order { get; set; }

        public int ProductID { get; set; }

        [ForeignKey("ProductID")]
        public Product? Product { get; set; }
    }
}