using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataFacade.Interface;
using GRDataModel;
using GRDataLayer.Contract;
using GRDataLayer.Repository;

namespace GRDataFacade.BusinessLayer
{
    public class PaytmLoginBO : IPaytmLoginBO
    {
        #region Unitof work Ref
        IUnitOfWork _unitOfWork = null;

        public PaytmLoginBO(IUnitOfWork GRDBContext)
        {
            this._unitOfWork = GRDBContext;
        }

        public PaytmLoginBO()
        {
            this._unitOfWork = new UnitOfWork();
        }
        #endregion Unitof work Ref


        //Login User
        public PaytmLogin LoginUser(string UserName, string Password)
        {
            IEnumerable<PaytmLogin> paytm = _unitOfWork.Repository<PaytmLogin>().GetAll();
            PaytmLogin login = (from data in paytm where data.UserName == UserName & data.Password == Password select data).FirstOrDefault();
            return login;
        }


        //ForgetPassword
        public PaytmCustomers ForgetPassword(string Email, string Question, string Answer)
        {
            IEnumerable<PaytmCustomers> paytm = _unitOfWork.Repository<PaytmCustomers>().GetAll();
            PaytmCustomers login = (from data in paytm where data.Email == Email & data.Question == Question & data.Answer == Answer select data).FirstOrDefault();
            return login;
        }
    }
}
