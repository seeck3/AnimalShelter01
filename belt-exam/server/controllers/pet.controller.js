// using const Book = require('mongoose').model('Book'); instead of using mongoose and book seperate
const Pet = require('mongoose').model('Pet');


// const Book = mongoose.model('Book');


module.exports = {
  // get all of resource
  index(request, response) {
    console.log("getting pets");
    Pet.find({})
      .then(pets => response.json(pets))
      .catch(console.log)
  },

  // get a single resource
  show(request, response) {
    Pet.findById(request.params.pet_id)
      .then(pet => response.json(pet))
      .catch(console.log)
  },

  // create resource

  create(request, response) {
    console.log("request.body", request.body)
    Pet.create(request.body)
      .then(() => {
        Pet.findOneAndUpdate({
            name: request.body.name
          }, {
            $set: {
              likes: 0
            }
          }, (err) => {
            if (err) {
              console.log("you missed LIKES database")
            }
          })
          .then(pet => response.json(pet))
          .catch(error => {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

            response.status(402).json(errors);
          });
      })
  },
  // 이게 기본 포스트 create
  // create(request, response) {
  //   console.log("request.body", request.body)
  //   Pet.create(request.body)
  //     .then(pet => response.json(pet))
  //     .catch(error => {
  //       const errors = Object.keys(error.errors).map(key => error.errors[key].message)

  //       response.status(402).json(errors);
  //     });
  // },

  // update resource
  update(request, response) {
    console.log("request.params.pet_id", request.params.pet_id);
    console.log('request.body', request.body.name);
    Pet.findByIdAndUpdate(request.params.pet_id, request.body, {
        new: true
      })
      .then(pet => response.json(pet))
      .catch(console.log)
  },

  // Like button

  like(request, response) {
    console.log('request_params_pet_id', request.params.pet_id)
    Pet.findById(request.params.pet_id)
      .then((pet) => {
        pet.likes = pet.likes += 1
        pet.save()
        console.log("GOT a like!!", pet.likes)
        response.json(pet)
      })
  },


  // delete/remove resource
  destroy(request, response) {
    Pet.findByIdAndRemove(request.params.pet_id)
      .then(pet => response.json(pet))
      .catch(console.log)
  },


};
