using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GRDataModel;
using GRDataLayer.Contract;
using GRDataLayer.Repository;
using GRDataFacade.Interface;

namespace GRDataFacade.BusinessLayer
{
    public class ClothCategoryBO : IClothCategoryBO
    {
        #region Unitof work Ref
        IUnitOfWork _unitOfWork = null;

        public ClothCategoryBO(IUnitOfWork GRDBContext)
        {
            this._unitOfWork = GRDBContext;
        }

        public ClothCategoryBO()
        {
            this._unitOfWork = new UnitOfWork();
        }
        #endregion Unitof work Ref

        //GetSizeClothDat By Passing CATEGORYID
        public List<SizeCloth> GetSizeClothProducts()
        {

            var Size = _unitOfWork.Repository<SizeCloth>().GetAll().ToList();
            return Size;
        }

        //GetBrandClothDat By Passing CATEGORYID
        public List<BrandCloth> GetBrandClothProducts()
        {
            var Brand = _unitOfWork.Repository<BrandCloth>().GetAll().ToList();
            return Brand;
        }


        //GetNecktypeClothDat By Passing CATEGORYID
        public List<NecktypeCloth> GetNecktypeClothProducts()
        {
            var Necktype = _unitOfWork.Repository<NecktypeCloth>().GetAll().ToList();
            return Necktype;
        }

        //GetSleevesClothDat By Passing CATEGORYID
        public List<SleevesCloth> GetSleevesClothProducts()
        {
            var Sleeves = _unitOfWork.Repository<SleevesCloth>().GetAll().ToList();
            return Sleeves;
        }

        //GetFitClothDat By Passing CATEGORYID
        public List<FitCloth> GetFitClothProducts()
        {
            var Fit = _unitOfWork.Repository<FitCloth>().GetAll().ToList();
            return Fit;
        }

        //GetColorClothDat By Passing CATEGORYID
        public List<ColorCloth> GetColorClothProducts()
        {
            var Color = _unitOfWork.Repository<ColorCloth>().GetAll().ToList();
            return Color;
        }
        //GetMaterialClothDat By Passing CATEGORYID
        public List<MaterialCloth> GetMaterialClothProducts()
        {
            var Material = _unitOfWork.Repository<MaterialCloth>().GetAll().ToList();
            return Material;
        }

        //GetOccasionClothDat By Passing CATEGORYID
        public List<OccasionCloth> GetOccasionClothProducts()
        {
            var Occasion = _unitOfWork.Repository<OccasionCloth>().GetAll().ToList();
            return Occasion;
        }
        //DashboardCloth Details
        public List<DashboardCloth> AvailableDashboardCloth()
        {
            var DashboardCloth = _unitOfWork.Repository<DashboardCloth>().GetAll().ToList();
            return DashboardCloth;
        }

        public List<DashBoardClothImages> DashBoardClothImages()
        {
            var DashboardCloth = _unitOfWork.Repository<DashBoardClothImages>().GetAll().ToList(); ;
            return DashboardCloth;
        }


        //NewDashBoardProduct
        public void NewDashBoardProduct(DashboardCloth dashboard)
        {
            _unitOfWork.Repository<DashboardCloth>().Insert(dashboard);
            _unitOfWork.Save();
        }

        //CheckPincodeAvailOrNOt
        public DelivaryAvails CheckPincodeAvailOrNot(int Pincode)
        {
            return _unitOfWork.Repository<DelivaryAvails>().FindById(Pincode);
        }

        /// <summary>
        /// checking Product count is available or not in Store
        /// </summary>
        /// <param name="Count"></param>
        /// <returns></returns>
        public DashboardCloth CheckProductCount(int ItemId)
        {
            return _unitOfWork.Repository<DashboardCloth>().FindById(ItemId);
        }
    }
}
