using ECommercePlatform.Server.Entities.Base;
using ECommercePlatform.Server.Entities.HomeSections;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommercePlatform.Server.Entities.Main
{
    public class SubCategory : CrudBase
    {
        public string? ArabicName { get; set; }
        public string? EnglishName { get; set; }
        public int? CategoryID { get; set; }
        public string? ImageUrl { get; set; }


        [ForeignKey("CategoryID")]
        public Category? Category { get; set; }

        [NotMapped]
        public IFormFile? ImageFile { get; set; }

        public ICollection<ProductSection>? ProductSections { get; set; } = [];
    }
}
