using ECommercePlatform.Server.Helpers.ImageHelper;
using ECommercePlatform.Server.Services.Identity;
using ECommercePlatform.Server.Services.Main.Admin;
using ECommercePlatform.Server.Services.Main.Category;
using ECommercePlatform.Server.Services.Main.CategoryProducts;
using ECommercePlatform.Server.Services.Main.Product;
using ECommercePlatform.Server.Services.Main.SubCategory;

namespace ECommercePlatform.Server.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCrudServices(this IServiceCollection services)
        {
            // Register all CRUD services for entities here
            // services.AddScoped(typeof(ICrudService<>), typeof(CrudService<>));

            // specific services to register

            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICategoryProductsService, CategoryProductsService>();
            services.AddScoped<ISubCategoryService, SubCategoryService>();
            services.AddScoped<ImageHelperService>();

        }
    }
}
