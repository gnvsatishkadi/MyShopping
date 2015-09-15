using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataModel;

namespace GRDataFacade.Interface
{
    public interface ITrackOrderBO
    {
        /// <summary>
        /// Retreving LiveOrder Data i.e recently Successed item Purchased Information
        /// </summary>
        /// <param name="Email"></param>
        /// <param name="OrderId"></param>
        /// <returns></returns>
        List<PurchaseOrder> GetAllPurchaseOrderData();

        /// <summary>
        /// Returns all the Data of PurchaseOrderDetails Table
        /// </summary>
        /// <returns></returns>
        List<PurchaseOrderDetails> GetAllPurchaseOrderDetailsData();

        /// <summary>
        /// this method is used to Show OrderedItem Status from TrackingOrderStatus Table
        /// </summary>
        /// <returns>
        /// It Returns only one Record 
        /// </returns>
        TrackingOrderStatus GetTrackingOrderStatusData(string POId, int POItemId);

        List<TrackingOrderStatus> GetAllTrackingOrderStatusData();
    }
}
