using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class BlockchainContext:DbContext
    {
        //public DbSet<Klasa> Klase {get; set;}
        public DbSet<Blockchain> Blockchains{get;set;}
        public DbSet<User> Users{get;set;}
        public DbSet<Block> Blocks{get;set;}
        public BlockchainContext(DbContextOptions opts)
        :base(opts)
        {}

    }
}