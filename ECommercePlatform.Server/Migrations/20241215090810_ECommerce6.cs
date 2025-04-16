using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommercePlatform.Server.Migrations
{
    /// <inheritdoc />
    public partial class ECommerce6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GalleryImages",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LinkUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GalleryImages", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "HeroSections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MainImageID = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroSections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ImageGallerySections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LinkUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageGallerySections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductSections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SectionType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BadgeText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BadgeColor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductIds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HeroImages",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LinkUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HeroSectionId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroImages", x => x.ID);
                    table.ForeignKey(
                        name: "FK_HeroImages_HeroSections_HeroSectionId",
                        column: x => x.HeroSectionId,
                        principalTable: "HeroSections",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_HeroImages_HeroSectionId",
                table: "HeroImages",
                column: "HeroSectionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GalleryImages");

            migrationBuilder.DropTable(
                name: "HeroImages");

            migrationBuilder.DropTable(
                name: "ImageGallerySections");

            migrationBuilder.DropTable(
                name: "ProductSections");

            migrationBuilder.DropTable(
                name: "HeroSections");
        }
    }
}
