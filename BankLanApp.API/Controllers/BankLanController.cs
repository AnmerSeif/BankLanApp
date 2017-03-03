using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BankLanApp.API.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class BankLanController : ApiController
    {
        public HttpResponseMessage Get()
        {
            using (var db = new BankLanContext())
            {
                List<Soknad> soknader = db.Soknader.ToList();

                string json = JsonConvert.SerializeObject(soknader);

                return new HttpResponseMessage()
                {
                    Content = new StringContent(json, Encoding.UTF8, "application/json"),
                    StatusCode = HttpStatusCode.OK
                };

            }


        }

        public HttpResponseMessage Get(string personnummer)
        {
            using (var db = new BankLanContext())
            {
                List<Soknad> soknader = db.Soknader.
                    Where(s => s.personnummer.StartsWith(personnummer))
                    .ToList();

                string json = JsonConvert.SerializeObject(soknader);


                return new HttpResponseMessage()
                {
                    Content = new StringContent(json, Encoding.UTF8, "application/json"),
                    StatusCode = HttpStatusCode.OK
                };
            }

        }

        [HttpPost]
        public bool Post([FromBody]Soknad soknad)
        {
            using(var db = new BankLanContext())
            {
                Kunde kunde = db.Kunder.Find(soknad.kunde.personnummer);
                if(kunde == null)
                {
                    kunde = new Kunde
                    {
                        personnummer = soknad.kunde.personnummer,
                        tlf = soknad.kunde.tlf,
                        epost = soknad.kunde.epost
                    };
                    db.Kunder.Add(kunde);
                }
                Soknad nySoknad = new Soknad
                {
                    belop = Convert.ToInt32(soknad.belop),
                    antall_ar = Convert.ToInt32(soknad.antall_ar),
                    kostnader = Convert.ToInt32(soknad.kostnader),
                    personnummer = kunde.personnummer
                };
                try
                {
                    db.Soknader.Add(nySoknad);
                    db.SaveChanges();
                    return true;
                }
                catch (DbEntityValidationException dbEx)
                {
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            Trace.TraceInformation("Property: {0} Error: {1}",
                                                    validationError.PropertyName,
                                                    validationError.ErrorMessage);
                        }
                    }
                    return false;
                }
            }
        }
    }
}
