using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Collections.Generic;


namespace server.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("USERNAME")]
        [MaxLength(255)]
        public string Username{get; set;}

        [Column("TOKENBALANCE")]
        public int TokenBalance{get;set;}

        [Column("MONEYBALANCE")]
        public int MoneyBalance{get;set;}

        [Column("RIGCOST")]
        public int RigCost{get;set;}

        [Column("MININGPROGRAM")]
        public string MiningProgram{get;set;}
        public List<Block> Blocks{get;set;}

        [JsonIgnore]
        public Blockchain Blockchain{get; set;}

    }
}