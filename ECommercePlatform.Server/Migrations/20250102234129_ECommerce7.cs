using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommercePlatform.Server.Migrations
{
    /// <inheritdoc />
    public partial class ECommerce7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HeroImages_HeroSections_HeroSectionId",
                table: "HeroImages");

            migrationBuilder.DropColumn(
                name: "ProductIds",
                table: "ProductSections");

            migrationBuilder.DropColumn(
                name: "SectionType",
                table: "ProductSections");

            migrationBuilder.DropColumn(
                name: "MainImageID",
                table: "HeroSections");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProductSections",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "HeroSections",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "HeroSectionId",
                table: "HeroImages",
                newName: "HeroSectionID");

            migrationBuilder.RenameIndex(
                name: "IX_HeroImages_HeroSectionId",
                table: "HeroImages",
                newName: "IX_HeroImages_HeroSectionID");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "ProductSections",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "HeroSections",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "HeroSectionID",
                table: "HeroImages",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "HeroImages",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "SectionProducts",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    SectionID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SectionProducts", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SectionProducts_ProductSections_SectionID",
                        column: x => x.SectionID,
                        principalTable: "ProductSections",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SectionProducts_Products_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SectionProducts_ProductID",
                table: "SectionProducts",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_SectionProducts_SectionID",
                table: "SectionProducts",
                column: "SectionID");

            migrationBuilder.AddForeignKey(
                name: "FK_HeroImages_HeroSections_HeroSectionID",
                table: "HeroImages",
                column: "HeroSectionID",
                principalTable: "HeroSections",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HeroImages_HeroSections_HeroSectionID",
                table: "HeroImages");

            migrationBuilder.DropTable(
                name: "SectionProducts");

            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "HeroImages");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "ProductSections",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "HeroSections",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "HeroSectionID",
                table: "HeroImages",
                newName: "HeroSectionId");

            migrationBuilder.RenameIndex(
                name: "IX_HeroImages_HeroSectionID",
                table: "HeroImages",
                newName: "IX_HeroImages_HeroSectionId");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "ProductSections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductIds",
                table: "ProductSections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SectionType",
                table: "ProductSections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "HeroSections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MainImageID",
                table: "HeroSections",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "HeroSectionId",
                table: "HeroImages",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_HeroImages_HeroSections_HeroSectionId",
                table: "HeroImages",
                column: "HeroSectionId",
                principalTable: "HeroSections",
                principalColumn: "Id");
        }
    }
}
