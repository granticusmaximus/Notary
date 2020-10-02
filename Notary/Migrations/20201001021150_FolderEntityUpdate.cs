using Microsoft.EntityFrameworkCore.Migrations;

namespace Notary.Migrations
{
    public partial class FolderEntityUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b1c461d5-c54e-4575-9d61-d3fdb8b5057f");

            migrationBuilder.AddColumn<int>(
                name: "FolderID",
                table: "Notes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Folders",
                columns: table => new
                {
                    FolderID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FolderName = table.Column<string>(nullable: true),
                    NoteContentID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Folders", x => x.FolderID);
                    table.ForeignKey(
                        name: "FK_Folders_Notes_NoteContentID",
                        column: x => x.NoteContentID,
                        principalTable: "Notes",
                        principalColumn: "ContentID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "FirstName", "LastName" },
                values: new object[] { "3fb57d35-9324-453d-a043-80504c194e52", 0, "28693511-a773-4a8e-9d48-5c0037332ecd", "ApplicationUser", "gwatson117@gmail.com", true, false, null, "gwatson117@gmail.com", "gwatson117@gmail.com", "AQAAAAEAACcQAAAAEJcPzmPjf/GaXrsHtClnv3HG/jnouCny3pqZZRSbwQ3QG5im+Onsa5S5p1is1Wd9CQ==", null, false, "1a0043b8-29f6-4543-8cf4-ec47475deb33", false, "gwatson117@gmail.com", "Grant", "Watson" });

            migrationBuilder.CreateIndex(
                name: "IX_Notes_FolderID",
                table: "Notes",
                column: "FolderID");

            migrationBuilder.CreateIndex(
                name: "IX_Folders_NoteContentID",
                table: "Folders",
                column: "NoteContentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Folders_FolderID",
                table: "Notes",
                column: "FolderID",
                principalTable: "Folders",
                principalColumn: "FolderID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Folders_FolderID",
                table: "Notes");

            migrationBuilder.DropTable(
                name: "Folders");

            migrationBuilder.DropIndex(
                name: "IX_Notes_FolderID",
                table: "Notes");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3fb57d35-9324-453d-a043-80504c194e52");

            migrationBuilder.DropColumn(
                name: "FolderID",
                table: "Notes");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "FirstName", "LastName" },
                values: new object[] { "b1c461d5-c54e-4575-9d61-d3fdb8b5057f", 0, "af1bacfa-deb9-4287-8fc7-54f452a5127b", "ApplicationUser", "gwatson117@gmail.com", true, false, null, "gwatson117@gmail.com", "gwatson117@gmail.com", "AQAAAAEAACcQAAAAEAGpkSNDSDuhjCTCH9WJ4KfetTBshjyK1TerLMb+7bCRbSoTVkw3iKoUWXPUJ3rPuQ==", null, false, "c2a06ef2-44d5-44a9-b0b9-4feed64d5d7f", false, "gwatson117@gmail.com", "Grant", "Watson" });
        }
    }
}
