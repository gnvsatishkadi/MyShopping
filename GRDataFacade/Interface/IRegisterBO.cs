using GRDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GRDataFacade.Interface
{
    public interface IRegisterBO
    {
        List<RepRegister> GetAllRegister();
        void NewRegister(RepRegister rep);
        void UpdateRegister(RepRegister rep);
        void DeleteRegister(RepRegister rep);
        RepRegister GetRegById(int id);
    }
}
