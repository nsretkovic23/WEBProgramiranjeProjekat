using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server.Models;

namespace server.Controllers
{
    public class BlockchainController:ControllerBase
    {
        //private readonly ILogger<BlockchainController> _logger;
        public BlockchainContext Context;
        public BlockchainController(BlockchainContext context)
        {
            Context = context;
        }

        [Route("GetAllBlockchains")]
        [HttpGet]
        public async Task<List<Blockchain>> getAllBlockchains(){
            return await Context.Blockchains.Include(p => p.Users).Include(p => p.Blocks).ToListAsync();
        }

        [Route("AddBlockchain")]
        [HttpPost]
        public async Task postBlockchain([FromBody] Blockchain bc){
            Context.Blockchains.Add(bc);
            await Context.SaveChangesAsync();
        }

        [Route("UpdateBlockchain")]
        [HttpPut]
        public async Task updateBlockchain([FromBody] Blockchain bc)
        {
            //var oldBlockchain = await Context.Blockchains.FindAsync(bc.ID);
            Context.Update<Blockchain>(bc);
            
            await Context.SaveChangesAsync();
        }

        [Route("DeleteBlockchain/{id}")]
        [HttpDelete]
        public async Task deleteBlockchain(int id)
        {
            var oldBc = await Context.FindAsync<Blockchain>(id);
            Context.Remove(oldBc);

            await Context.SaveChangesAsync();
        }
        //users part
        [Route("AddUser/{blockchainid}")]
        [HttpPost]
        public async Task postUser(int blockchainid, [FromBody] User u)
        {
            var bc = await Context.Blockchains.FindAsync(blockchainid);
            u.Blockchain = bc;
            Context.Users.Add(u);
            await Context.SaveChangesAsync();
        }
        
        [Route("GetUser/{id}")]
        [HttpGet]
        public async Task<User> GetUser(int id)
        {
            return await Context.FindAsync<User>(id);
        }

        [Route("UpdateUser")]
        [HttpPut]
         public async Task updateUser([FromBody] User u)
        {
            //var oldBlockchain = await Context.Blockchains.FindAsync(bc.ID);
            Context.Update<User>(u);
            
            await Context.SaveChangesAsync();
        }



        [Route("DeleteUser/{id}")]
        [HttpDelete]
        public async Task deleteUser(int id)
        {
            var oldUser = await Context.FindAsync<User>(id);
            Context.Remove(oldUser);

            await Context.SaveChangesAsync();
        }

        //blocks part
        [Route("AddBlock/{blockchainid}/{userid}")]
        [HttpPost]
        public async Task postBlock(int blockchainid, int userid, [FromBody] Block b)
        {
            var blockchain = await Context.Blockchains.FindAsync(blockchainid);
            var user = await Context.Users.FindAsync(userid);
            b.Blockchain = blockchain;
            b.User = user;
            Context.Blocks.Add(b);
            
            await Context.SaveChangesAsync();
        }
    }
}
