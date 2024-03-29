using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interface;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommandValidator:AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Title).NotEmpty();
                RuleFor(x=>x.Description).NotEmpty();
                RuleFor(x=>x.Category).NotEmpty();
                RuleFor(x=>x.Date).NotEmpty();
                RuleFor(x=>x.City).NotEmpty();
                RuleFor(x=>x.Venue).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAssessor;

            public Handler(DataContext context, IUserAccessor userAssessor)
            {
                _context = context;
                _userAssessor = userAssessor;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAssessor.GetUserName());
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };
                var attendee = new ActivityAttendee
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = true
                };
                activity.Attendees.Add(attendee);
                _context.Activities.Add(activity);
                var success = await _context.SaveChangesAsync() > 0;
                if(success) return Unit.Value;
                throw new Exception("Problem saving new activity");
            }
        }
    }


}