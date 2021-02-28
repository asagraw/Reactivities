using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _meadiator;
        public ActivitiesController(IMediator meadiator)
        {
            _meadiator = meadiator;

        }

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List(System.Threading.CancellationToken ct)
        {
            // return await _meadiator.Send(new List.Query(), ct);
            return await _meadiator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _meadiator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _meadiator.Send(command);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _meadiator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id, Delete.Command command)
        {
            command.Id = id;
            return await _meadiator.Send(command);
        }
    }
}