using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("Blockchain")]

    public class Blockchain
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("NAME")]
        [MaxLength(255)]
        public string Name{get; set;}

        [Column("MAXUSERNUMBER")]
        public int MaxUserNumber{get;set;}

        [Column("REWARDVALUE")]
        public int RewardValue{get;set;}

        [Column("IMAGEURL")]
        [MaxLength(255)]

        public string ImgUrl{get;set;}

        public virtual List<User> Users{get;set;}

        public virtual List<Block> Blocks{get;set;}
    }
}