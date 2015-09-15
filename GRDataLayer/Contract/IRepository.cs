using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GRDataLayer.Contract
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> GetAll();
        void Insert(TEntity ent);
        void Update(TEntity ent);
        void Delete(TEntity ent);
        TEntity FindById(object id);
        TEntity FindByNameEmail(object name, object Email);
    }
}
