using GRDataFacade.Interface;
using GRDataLayer.Contract;
using GRDataLayer.Repository;
using GRDataModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GRDataFacade.BusinessLayer
{
    public class PaytmCustomersBO : IPaytmCustomersBO
    {
        #region Unitof work Ref
        IUnitOfWork _unitOfWork = null;

        public PaytmCustomersBO(IUnitOfWork GRDBContext)
        {
            this._unitOfWork = GRDBContext;
        }

        public PaytmCustomersBO()
        {
            this._unitOfWork = new UnitOfWork();
        }
        #endregion Unitof work Ref

        //GetAll
        public List<PaytmCustomers> GetAllPaytmsCus()
        {
            var data = _unitOfWork.Repository<PaytmCustomers>().GetAll().ToList();
            return data;
        }
        //Insert
        public void NewPaytmCus(PaytmCustomers paytm)
        {
            //Change Date formate--- 


            string DOB = paytm.DOB.ToString();
            string Doa = Convert.ToString(paytm.DateofAccount);

            DOB = Convert.ToString(DOB);
            DOB = DOB.Substring(0, 10);

            paytm.DOB = DOB;
            paytm.DateofAccount = Doa;

            _unitOfWork.Repository<PaytmCustomers>().Insert(paytm);
            _unitOfWork.Save();
        }
        //Update
        public void UpdatePaytmCus(PaytmCustomers paytm)
        {
            _unitOfWork.Repository<PaytmCustomers>().Update(paytm);
            _unitOfWork.Save();
        }
        //Delete
        public void DeletePaytmCus(PaytmCustomers paytm)
        {
            _unitOfWork.Repository<PaytmCustomers>().Delete(paytm);
            _unitOfWork.Save();
        }
        //ById
        public PaytmCustomers GetPaytmCusById(string Username, string Email)
        {
            return _unitOfWork.Repository<PaytmCustomers>().FindByNameEmail(Username, Email);
        }


        //GetAllNewUserRegistration
        public List<NewUserRegistration> GetAllUserRegistration()
        {
            var Data = _unitOfWork.Repository<NewUserRegistration>().GetAll().ToList();
            return Data;
        }

        //Checking User Login
        public NewUserRegistration UserLogin(string UserName, string Password)
        {
            var login = _unitOfWork.Repository<NewUserRegistration>().FindByNameEmail(UserName, Password);
            return login;
        }

        //Forget Password
        public void ForgetPassword(string EmailId)
        {
            var forget = _unitOfWork.Repository<NewUserRegistration>().FindById(EmailId);
        }

        //SignUp
        public void NewSignUp(NewUserRegistration SignUp)
        {
            _unitOfWork.Repository<NewUserRegistration>().Insert(SignUp);
            _unitOfWork.Save();
        }

        //Edit UserProfile data
        public void EditUserProfileData(NewUserRegistration newdata)
        {
            _unitOfWork.Repository<NewUserRegistration>().Update(newdata);
            _unitOfWork.Save();
        }

        //StorePurchaseOrder Value
        public void PurchaseOrderData(PurchaseOrder POrder)
        {
            _unitOfWork.Repository<PurchaseOrder>().Insert(POrder);
            _unitOfWork.Save();
        }

        //Store PurchaseOrderDetails Value
        public void PurchaseOrderDetailsData(PurchaseOrderDetails PODetails)
        {
            _unitOfWork.Repository<PurchaseOrderDetails>().Insert(PODetails);
            _unitOfWork.Save();
        }

        //Store TrackingOrderStatus Data
        public void TrackingOrderStatusData(TrackingOrderStatus Trackingdata)
        {
            _unitOfWork.Repository<TrackingOrderStatus>().Insert(Trackingdata);
            _unitOfWork.Save();
        }
    }
}
