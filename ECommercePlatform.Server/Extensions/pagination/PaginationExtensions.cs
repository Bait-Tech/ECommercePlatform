using Microsoft.EntityFrameworkCore;

namespace ECommercePlatform.Server.Extensions.pagination
{
    public static class PaginationExtensions
    {
        public static async Task<PaginatedResult<T>> ToPaginatedListAsync<T>(
        this IQueryable<T> source,
        PaginationParams paginationParams)
        {
            var totalCount = await source.CountAsync();

            if(totalCount == 0)
            {
                return null;
            }
            var items = await source
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
                .ToListAsync();

            return new PaginatedResult<T>(
                items,
                totalCount,
                paginationParams.PageNumber,
                paginationParams.PageSize);
        }
    }
}
