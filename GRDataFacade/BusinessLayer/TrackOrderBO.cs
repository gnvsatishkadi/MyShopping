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
    public class TrackOrderBO : ITrackOrderBO
    {
        #region Unitof work Ref
        IUnitOfWork _unitOfWork = null;
        public TrackOrderBO(IUnitOfWork GRDBContext)
        {
            this._unitOfWork = GRDBContext;
        }
        public TrackOrderBO()
        {
            this._unitOfWork = new UnitOfWork();
        }
        #endregion Unitof work Ref


        /// <summary>
        /// Get LiveOrder Data , i.e recently successed Order Purchased information
        /// </summary>
        /// <param name="Email"></param>
        /// <param name="OrderId"></param>
        /// <returns></returns>
        public List<PurchaseOrder> GetAllPurchaseOrderData()
        {
            var PurchaseOrderData = _unitOfWork.Repository<PurchaseOrder>().GetAll().ToList();
            return PurchaseOrderData;
        }
        /// <summary>
        /// Retreving PurchaseOrderDetails Data ,,i.e Recently Added
        /// </summary>
        /// <returns></returns>
        public List<PurchaseOrderDetails> GetAllPurchaseOrderDetailsData()
        {
            var PurchaseOrderDetailsData = _unitOfWork.Repository<PurchaseOrderDetails>().GetAll().ToList();
            return PurchaseOrderDetailsData;
        }

        /// <summary>
        /// Retreving Tracking order data to show delivery items in future 
        /// </summary>
        /// <param name="POId"></param>
        /// <param name="ItemId"></param>
        /// <returns></returns>
        public TrackingOrderStatus GetTrackingOrderStatusData(string POId, int POItemId)
        {
            var OrderStatus = _unitOfWork.Repository<TrackingOrderStatus>().GetAll().Where(O => O.POId == POId && O.POItemId == POItemId).First();
            return OrderStatus;
        }

        /// <summary>
        /// Retreving complete tracking order data to show in Myorders page by using joins
        /// </summary>
        /// <returns></returns>
        public List<TrackingOrderStatus> GetAllTrackingOrderStatusData()
        {
            var OrderStatus = _unitOfWork.Repository<TrackingOrderStatus>().GetAll().ToList();
            return OrderStatus;
        }
    }
}
