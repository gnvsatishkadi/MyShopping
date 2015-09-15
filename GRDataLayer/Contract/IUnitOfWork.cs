using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataLayer.Contract;


namespace GRDataLayer.Contract
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> Repository<TEntity>() where TEntity : class;
        void Dispose(bool disposing);
        void Save();
    }
}
