using ECommercePlatform.Server.Entities.Base;
using ECommercePlatform.Server.Entities.HomeSections;

namespace ECommercePlatform.Server.Entities.Main
{
    public class Category : CrudBase
    {
        public string? ArabicName { get; set; }
        public required string EnglishName {  get; set; }
        public string? ImageUrl { get; set; }
        public ICollection<Product>? Products { get; set; }
        public ICollection<SubCategory>? SubCategories { get; set; }
        public ICollection<ProductSection>? ProductSections { get; set; } = [];
    }
}
