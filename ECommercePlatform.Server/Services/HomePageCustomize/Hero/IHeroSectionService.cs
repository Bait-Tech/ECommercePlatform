using ECommercePlatform.Server.DTOs.HomePageSections;

namespace ECommercePlatform.Server.Services.HomePageCustomize.Hero
{
    public interface IHeroSectionService
    {
        Task<HeroSectionDTO> Get();
        Task<int> Insert(HeroSectionDTO model);
        Task<int> Update(HeroSectionDTO model);
    }
}
