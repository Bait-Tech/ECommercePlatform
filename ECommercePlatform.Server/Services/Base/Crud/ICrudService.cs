using ECommercePlatform.Server.Extensions.pagination;

namespace ECommercePlatform.Server.Services.Base.Crud
{
    public interface ICrudService<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<PaginatedResult<T>> GetAllPagedAsync(PaginationParams paginationParams);
        Task<T> GetByIdAsync(int id);
        Task<int> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }
}
