USE [ThuVienSach]
GO
/****** Object:  Table [dbo].[PhanQuyen]    Script Date: 20/03/2018 11:37:15 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhanQuyen](
	[MaQuyen] [int] NOT NULL,
	[MaLoaiTK] [int] NOT NULL,
	[KichHoat] [bit] NULL,
 CONSTRAINT [PK_PhanQuyen] PRIMARY KEY CLUSTERED 
(
	[MaQuyen] ASC,
	[MaLoaiTK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Quyen]    Script Date: 20/03/2018 11:37:16 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Quyen](
	[MaQuyen] [int] IDENTITY(1,1) NOT NULL,
	[TenQuyen] [nvarchar](50) NULL,
 CONSTRAINT [PK_Quyen] PRIMARY KEY CLUSTERED 
(
	[MaQuyen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
INSERT [dbo].[PhanQuyen] ([MaQuyen], [MaLoaiTK], [KichHoat]) VALUES (39, 1, 1)
SET IDENTITY_INSERT [dbo].[Quyen] ON 

INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (1, N'Xem chủ đề')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (2, N'Thêm chủ đề')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (3, N'Xóa chủ đề')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (4, N'Sửa chủ đề')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (5, N'Xem đơn mượn')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (6, N'Thêm đơn mượn')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (7, N'Xóa đơn mượn')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (8, N'Sửa đơn mượn')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (9, N'Xem loại tài khoản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (10, N'Thêm  loại tài khoản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (11, N'Xóa  loại tài khoản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (12, N'Sửa  loại tài khoản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (13, N'Xem nhà xuất bản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (14, N'Thêm nhà xuất bản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (15, N'Xóa nhà xuất bản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (16, N'Sửa nhà xuất bản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (17, N'Xem phân quyền')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (18, N'Phân quyền')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (19, N'Xem thông tin sách')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (20, N'Thêm thông tin sách')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (21, N'Xóa thông tin sách')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (22, N'Sửa thông tin sách')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (23, N'Xem tác giả')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (24, N'Thêm tác giả')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (25, N'Xóa tác giả')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (26, N'Sửa tác giả')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (27, N'Xem tài khoản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (28, N'Thêm tài khoản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (29, N'Xóa tài khoản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (30, N'Sửa tài khoản')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (31, N'Xem tình trạng trả')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (32, N'Thêm tình trạng trả')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (33, N'Xóa tình trạng trả')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (34, N'Sửa tình trạng trả')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (35, N'Xem tham gia')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (36, N'Thêm tham gia')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (37, N'Xóa tham gia')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (38, N'Sửa tham gia')
INSERT [dbo].[Quyen] ([MaQuyen], [TenQuyen]) VALUES (39, N'Tất cả')
SET IDENTITY_INSERT [dbo].[Quyen] OFF
ALTER TABLE [dbo].[PhanQuyen]  WITH CHECK ADD  CONSTRAINT [FK_PhanQuyen_LoaiTaiKhoan] FOREIGN KEY([MaLoaiTK])
REFERENCES [dbo].[LoaiTaiKhoan] ([MaLoai])
GO
ALTER TABLE [dbo].[PhanQuyen] CHECK CONSTRAINT [FK_PhanQuyen_LoaiTaiKhoan]
GO
ALTER TABLE [dbo].[PhanQuyen]  WITH CHECK ADD  CONSTRAINT [FK_PhanQuyen_Quyen] FOREIGN KEY([MaQuyen])
REFERENCES [dbo].[Quyen] ([MaQuyen])
GO
ALTER TABLE [dbo].[PhanQuyen] CHECK CONSTRAINT [FK_PhanQuyen_Quyen]
GO
