﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QuanLyThuVien2.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ThuVienSachEntities : DbContext
    {
        public ThuVienSachEntities()
            : base("name=ThuVienSachEntities")
        {
            base.Configuration.ProxyCreationEnabled = false;

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<ChiTietDonHang> ChiTietDonHang { get; set; }
        public virtual DbSet<ChuDe> ChuDe { get; set; }
        public virtual DbSet<DonHang> DonHang { get; set; }
        public virtual DbSet<LoaiTaiKhoan> LoaiTaiKhoan { get; set; }
        public virtual DbSet<NhaXuatBan> NhaXuatBan { get; set; }
        public virtual DbSet<Quyen> Quyen { get; set; }
        public virtual DbSet<TacGia> TacGia { get; set; }
        public virtual DbSet<ThamGia> ThamGia { get; set; }
        public virtual DbSet<DanhDau> DanhDau { get; set; }
        public virtual DbSet<TinhTrang> TinhTrang { get; set; }
        public virtual DbSet<Sach> Sach { get; set; }
        public virtual DbSet<TaiKhoan> TaiKhoan { get; set; }
    }
}
