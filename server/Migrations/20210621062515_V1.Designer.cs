﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Models;

namespace server.Migrations
{
    [DbContext(typeof(BlockchainContext))]
    [Migration("20210621062515_V1")]
    partial class V1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.7")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("server.Models.Block", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BlockchainID")
                        .HasColumnType("int");

                    b.Property<int>("Reward")
                        .HasColumnType("int")
                        .HasColumnName("REWARD");

                    b.Property<int?>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("BlockchainID");

                    b.HasIndex("UserID");

                    b.ToTable("Blocks");
                });

            modelBuilder.Entity("server.Models.Blockchain", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ImgUrl")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("IMAGEURL");

                    b.Property<int>("MaxUserNumber")
                        .HasColumnType("int")
                        .HasColumnName("MAXUSERNUMBER");

                    b.Property<string>("Name")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("NAME");

                    b.Property<int>("RewardValue")
                        .HasColumnType("int")
                        .HasColumnName("REWARDVALUE");

                    b.HasKey("ID");

                    b.ToTable("Blockchain");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BlockchainID")
                        .HasColumnType("int");

                    b.Property<string>("MiningProgram")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("MININGPROGRAM");

                    b.Property<int>("MoneyBalance")
                        .HasColumnType("int")
                        .HasColumnName("MONEYBALANCE");

                    b.Property<int>("RigCost")
                        .HasColumnType("int")
                        .HasColumnName("RIGCOST");

                    b.Property<int>("TokenBalance")
                        .HasColumnType("int")
                        .HasColumnName("TOKENBALANCE");

                    b.Property<string>("Username")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("USERNAME");

                    b.HasKey("ID");

                    b.HasIndex("BlockchainID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("server.Models.Block", b =>
                {
                    b.HasOne("server.Models.Blockchain", "Blockchain")
                        .WithMany("Blocks")
                        .HasForeignKey("BlockchainID");

                    b.HasOne("server.Models.User", "User")
                        .WithMany("Blocks")
                        .HasForeignKey("UserID");

                    b.Navigation("Blockchain");

                    b.Navigation("User");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.HasOne("server.Models.Blockchain", "Blockchain")
                        .WithMany("Users")
                        .HasForeignKey("BlockchainID");

                    b.Navigation("Blockchain");
                });

            modelBuilder.Entity("server.Models.Blockchain", b =>
                {
                    b.Navigation("Blocks");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Navigation("Blocks");
                });
#pragma warning restore 612, 618
        }
    }
}