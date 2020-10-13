using Microsoft.EntityFrameworkCore.Migrations;

namespace Notary.Migrations
{
    public partial class ForeignKeyNoteFolderUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Folders_Notes_NoteContentID",
                table: "Folders");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Folders_FolderID",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_FolderID",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Folders_NoteContentID",
                table: "Folders");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3fb57d35-9324-453d-a043-80504c194e52");

            migrationBuilder.DropColumn(
                name: "FolderID",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "NoteContentID",
                table: "Folders");

            migrationBuilder.AddColumn<int>(
                name: "FolderRefID",
                table: "Notes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "FirstName", "LastName" },
                values: new object[] { "194bc3f5-7c76-4e61-849d-615e2428b4b3", 0, "60b6dc3b-fed1-4f4e-8d50-0eb5123b955e", "ApplicationUser", "gwatson117@gmail.com", true, false, null, "gwatson117@gmail.com", "gwatson117@gmail.com", "AQAAAAEAACcQAAAAEF38m2OF9yBFPefqNXtq9NU8LcV1GfzB2//CfhlsvYHdli7ji1KzwUZkfOXjV+DBFA==", null, false, "445f337b-87f8-4e8e-9fe6-81cfb7ae25a2", false, "gwatson117@gmail.com", "Grant", "Watson" });

            migrationBuilder.CreateIndex(
                name: "IX_Notes_FolderRefID",
                table: "Notes",
                column: "FolderRefID");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Folders_FolderRefID",
                table: "Notes",
                column: "FolderRefID",
                principalTable: "Folders",
                principalColumn: "FolderID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Folders_FolderRefID",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_FolderRefID",
                table: "Notes");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "194bc3f5-7c76-4e61-849d-615e2428b4b3");

            migrationBuilder.DropColumn(
                name: "FolderRefID",
                table: "Notes");

            migrationBuilder.AddColumn<int>(
                name: "FolderID",
                table: "Notes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NoteContentID",
                table: "Folders",
                type: "int",
                nullable: true);

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
                name: "FK_Folders_Notes_NoteContentID",
                table: "Folders",
                column: "NoteContentID",
                principalTable: "Notes",
                principalColumn: "ContentID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Folders_FolderID",
                table: "Notes",
                column: "FolderID",
                principalTable: "Folders",
                principalColumn: "FolderID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
