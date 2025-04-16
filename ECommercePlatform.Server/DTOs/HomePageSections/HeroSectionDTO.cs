namespace ECommercePlatform.Server.DTOs.HomePageSections
{
    public class HeroSectionDTO
    {
        public int ID { get; set; }
        public int? DisplayOrder { get; set; }
        public List<HeroSectionImageDTO> HeroSectionImageDTOs { get; set; } = [];
    }
}
