using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iText.IO.Font.Constants;
using iText.IO.Image;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Model;
using Microsoft.AspNetCore.Mvc;

namespace iText.Controllers
{
	[Route("api/itext")]
	[ApiController]
	public class ItextController : ControllerBase
	{
		private const string serverDirectory = @"wwwroot\";
		private const string FOX = "Quick-brown-fox.jpg";

		[HttpPost]
		[Route("CreateFile")]
		public ActionResult<Response> CreateFile([FromBody] Request request)
		{
			try
			{
				using (PdfWriter writer = new PdfWriter(serverDirectory + request.filename + ".pdf"))
				{
					//Initialize PDF writer
					;

					//Initialize PDF document
					PdfDocument pdf = new PdfDocument(writer);
					Document document = new Document(pdf);
					//Add paragraph to the document
					document.Add(new Paragraph("Hello World!"));

					Paragraph p1 = new Paragraph("Text added by the user: " + request.filetext);
					document.Add(p1);


					PdfFont font = PdfFontFactory.CreateFont(StandardFonts.TIMES_ROMAN);
					// Add a Paragraph
					document.Add(new Paragraph("iText is:").SetFont(font));
					// Create a List
					List list = new List().SetSymbolIndent(12).SetListSymbol("\u2022").SetFont(font);
					// Add ListItem objects
					list.Add(new ListItem("Never gonna give you up")).Add(new ListItem("Never gonna let you down")).Add(new ListItem
						("Never gonna run around and desert you")).Add(new ListItem("Never gonna make you cry")).Add(new ListItem
						("Never gonna say goodbye")).Add(new ListItem("Never gonna tell a lie and hurt you"));
					// Add the list
					document.Add(list);

					iText.Layout.Element.Image fox = new Image(ImageDataFactory.Create(serverDirectory + FOX));
					Paragraph p = new Paragraph("The quick brown ").Add(fox).Add(" jumps over the lazy dog");

					// Add Paragraph to document
					document.Add(p);

					//Close document
					document.Close();

					return new Response()
					{
						FileContent = string.Empty,
						FileName = string.IsNullOrEmpty(request.filename) ? Guid.NewGuid().ToString() + ".pdf" : request.filename + ".pdf",
						Message = "File created successfully",
						Success = true
					};
				}


			}
			catch (Exception ex)
			{
				return new Response()
				{
					FileContent = string.Empty,
					FileName = "",
					Message = "Could not create file. " + ex.Message,
					Success = false
				};
			}
		}

		[HttpPost]
		[Route("Merge")]
		public ActionResult<Response> Merge([FromBody] Request request)
		{
			try
			{
				//using ()
				{
					return new Response()
					{
						FileContent = string.Empty,
						FileName = string.IsNullOrEmpty(request.filename) ? Guid.NewGuid().ToString() + ".pdf" : request.filename + ".pdf",
						Message = "Files Merged successfully",
						Success = true
					};

				}
			}
			catch (Exception ex)
			{

				return new Response()
				{
					FileContent = string.Empty,
					FileName = "",
					Message = "Could not Merge files " + ex.Message,
					Success = false
				};

			}
		}
	}
}
