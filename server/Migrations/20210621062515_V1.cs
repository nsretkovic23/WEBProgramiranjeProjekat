using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blockchain",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAME = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    MAXUSERNUMBER = table.Column<int>(type: "int", nullable: false),
                    REWARDVALUE = table.Column<int>(type: "int", nullable: false),
                    IMAGEURL = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blockchain", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    USERNAME = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TOKENBALANCE = table.Column<int>(type: "int", nullable: false),
                    MONEYBALANCE = table.Column<int>(type: "int", nullable: false),
                    RIGCOST = table.Column<int>(type: "int", nullable: false),
                    MININGPROGRAM = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BlockchainID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Users_Blockchain_BlockchainID",
                        column: x => x.BlockchainID,
                        principalTable: "Blockchain",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Blocks",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    REWARD = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: true),
                    BlockchainID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blocks", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Blocks_Blockchain_BlockchainID",
                        column: x => x.BlockchainID,
                        principalTable: "Blockchain",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Blocks_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_BlockchainID",
                table: "Blocks",
                column: "BlockchainID");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_UserID",
                table: "Blocks",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_BlockchainID",
                table: "Users",
                column: "BlockchainID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Blocks");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Blockchain");
        }
    }
}
