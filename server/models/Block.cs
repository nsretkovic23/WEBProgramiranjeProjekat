using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace server.Models
{
    [Table("Blocks")]

    public class Block{

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("REWARD")]
        public int Reward{get; set;}

        [JsonIgnore]
        public User User{get;set;}

        [JsonIgnore]    
        public Blockchain Blockchain{get;set;}
    }
}