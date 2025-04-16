using ECommercePlatform.Server.Data;
using ECommercePlatform.Server.DTOs.Order;
using ECommercePlatform.Server.Entities.Orders;
using ECommercePlatform.Server.Extensions.pagination;
using Microsoft.EntityFrameworkCore;

namespace ECommercePlatform.Server.Services.Orders
{
    public class OrdersService : IOrdersService
    {
        private readonly ApplicationDBContext _dbContext;

        public OrdersService(ApplicationDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<bool> Insert(OrderDTO orderDTO)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();

            try
            {
                var orderProducts = orderDTO.ProductsOrderDTO;

                var products = await _dbContext.Products
                .Where(p => orderProducts.Select(op => op.ProductID).Contains(p.ID))
                .AsNoTracking()
                .ToListAsync();


                var productsOrders = products.Select(p =>
                {
                    var dtoItem = orderProducts.First(op => op.ProductID == p.ID);

                    return new ProductsOrders
                    {
                        ProductID = p.ID,
                        UnitPrice = p.Discount1Price != 0 ? p.Discount1Price.Value : p.Price,
                        QTY = dtoItem.ProductQTY
                    };
                })
                .ToList();

                var order = new Order
                {
                    Location = orderDTO.Location,
                    PhoneNumber = orderDTO.PhoneNumber,
                    UserName = orderDTO.UserName,
                    ProductsOrders = productsOrders,
                    CreateDate = DateTime.Now,
                    IsConfirmed = false,
                    Total = productsOrders.Sum(p => p.UnitPrice * p.QTY)
                };

                await _dbContext.AddAsync(order);

                await transaction.CommitAsync();

                return await _dbContext.SaveChangesAsync() > 0;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<PaginatedResult<OrderDTO>> GetOrders(FilterOrdersDTO filterOrdersDTO)
        {
            var baseQuery = _dbContext.Orders
                .AsNoTracking()
                .Include(o => o.ProductsOrders)
                    .ThenInclude(po => po.Product)
                        .ThenInclude(p => p.ProductImages)
                .AsQueryable();

            if (!string.IsNullOrEmpty(filterOrdersDTO.UserName))
            {
                baseQuery = baseQuery.Where(o => o.UserName.Contains(filterOrdersDTO.UserName));
            }

            if (!string.IsNullOrEmpty(filterOrdersDTO.PhoneNumber))
            {
                baseQuery = baseQuery.Where(o => o.PhoneNumber.Contains(filterOrdersDTO.PhoneNumber));
            }

            baseQuery = baseQuery.Where(o => o.IsConfirmed == filterOrdersDTO.IsApproved);

            var projectedQuery = baseQuery.Select(o => new OrderDTO
            {
                OrderID = o.ID,
                Location = o.Location,
                PhoneNumber = o.PhoneNumber,
                UserName = o.UserName,
                CreateDate = o.CreateDate,
                ConfirmDate = o.ConfirmDate,
                IsConfirmed = o.IsConfirmed,
                ProductsOrderDTO = o.ProductsOrders.Select(po => new ProductsOrderDTO
                {
                    ProductID = po.ProductID,
                    ProductImage = po.Product!.ProductImages
                        .Where(pi => pi.IsMain)
                        .Select(pi => pi.ImageUrl)
                        .FirstOrDefault() ?? string.Empty,
                    ProductName = po.Product != null ? po.Product.EnglishName : string.Empty,
                    ProductPrice = po.UnitPrice,
                    ProductQTY = po.QTY
                }).ToList()
            });

            return await projectedQuery.ToPaginatedListAsync(filterOrdersDTO.PaginationParams);
        }

        public async Task<bool> ApproveOrders(List<int> orderIds)
        {
            var orders = await _dbContext.Orders
                .Where(o => orderIds.Contains(o.ID))
                .ToListAsync();

            orders.ForEach(order =>
            {
                order.IsConfirmed = true;
                order.ConfirmDate = DateTime.Now;
            });

            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteOrders(List<int> orderIds)
        {
            var orders = await _dbContext.Orders
                .Where(o => orderIds.Contains(o.ID))
                .ToListAsync(); 

            _dbContext.RemoveRange(orders);

            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}