using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataLayer.Contract;
using System.Data.Entity;

namespace GRDataLayer.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly IDbContext _context;
        private readonly IDbSet<TEntity> _dbset;

        //Constructor
        public Repository(IDbContext context)
        {
            this._context = context;
            this._dbset = context.Set<TEntity>();
        }

        //GetAll
        public virtual IEnumerable<TEntity> GetAll()
        {
            return _dbset;
        }

        //Insert
        public void Insert(TEntity ent)
        {
            _dbset.Add(ent);
        }
        //Edit
        public TEntity FindById(object id)
        {
            return _dbset.Find(id);
        }
        //Update
        public void Update(TEntity ent)
        {
            _context.Entry(ent).State = System.Data.Entity.EntityState.Modified;
        }
        //Delete
        public void Delete(TEntity ent)
        {
            _context.Entry(ent).State = System.Data.Entity.EntityState.Deleted;
        }
        //Login using name and email
        public TEntity FindByNameEmail(object name, object Email)
        {
            return _dbset.Find(name, Email);
        }
    }
}
