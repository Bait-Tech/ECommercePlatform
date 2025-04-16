using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommercePlatform.Server.Migrations
{
    /// <inheritdoc />
    public partial class ECommerce9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryID",
                table: "ProductSections",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SubCategoryID",
                table: "ProductSections",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductSections_CategoryID",
                table: "ProductSections",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSections_SubCategoryID",
                table: "ProductSections",
                column: "SubCategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSections_Categories_CategoryID",
                table: "ProductSections",
                column: "CategoryID",
                principalTable: "Categories",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSections_SubCategories_SubCategoryID",
                table: "ProductSections",
                column: "SubCategoryID",
                principalTable: "SubCategories",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductSections_Categories_CategoryID",
                table: "ProductSections");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductSections_SubCategories_SubCategoryID",
                table: "ProductSections");

            migrationBuilder.DropIndex(
                name: "IX_ProductSections_CategoryID",
                table: "ProductSections");

            migrationBuilder.DropIndex(
                name: "IX_ProductSections_SubCategoryID",
                table: "ProductSections");

            migrationBuilder.DropColumn(
                name: "CategoryID",
                table: "ProductSections");

            migrationBuilder.DropColumn(
                name: "SubCategoryID",
                table: "ProductSections");
        }
    }
}
