using GRDataFacade.Interface;
using GRDataLayer.Contract;
using GRDataLayer.Repository;
using GRDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GRDataFacade.BusinessLayer
{
    public class RegisterBO : IRegisterBO
    {
        #region Unitof work Ref
        IUnitOfWork _unitOfWork = null;

        public RegisterBO(IUnitOfWork GRDBContext)
        {
            this._unitOfWork = GRDBContext;
        }

        public RegisterBO()
        {
            this._unitOfWork = new UnitOfWork();
        }
        #endregion Unitof work Ref

        //Get All Records
        public List<RepRegister> GetAllRegister()
        {
            var data = _unitOfWork.Repository<RepRegister>().GetAll().ToList();
            return data;
        }

        //Insert New Reocrd
        public void NewRegister(RepRegister rep)
        {
            _unitOfWork.Repository<RepRegister>().Insert(rep);
            _unitOfWork.Save();
        }

        //Edit Register
        public RepRegister GetRegById(int id)
        {
            return _unitOfWork.Repository<RepRegister>().FindById(id);
        }

        //Update Register
        public void UpdateRegister(RepRegister rep)
        {
            _unitOfWork.Repository<RepRegister>().Update(rep);
            _unitOfWork.Save();
        }

        //Delete Register
        public void DeleteRegister(RepRegister rep)
        {
            _unitOfWork.Repository<RepRegister>().Delete(rep);
            _unitOfWork.Save();
        }
    }
}
