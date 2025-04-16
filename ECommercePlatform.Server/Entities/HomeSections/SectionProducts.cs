using ECommercePlatform.Server.Entities.Main;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommercePlatform.Server.Entities.HomeSections
{
    public class SectionProducts
    {
        public int ID { get; set; }

        public int ProductID { get; set; }
        [ForeignKey("ProductID")]
        public Product? Product { get; set; }

        public int SectionID { get; set; }

        [ForeignKey("SectionID")]
        public ProductSection? ProductSection { get; set; }
    }
}