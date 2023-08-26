const model = require("./model");
const { onResponse } = require("../../utils/index");

module.exports = {
  tripCT: async (req, res) => {
    await onResponse(req, res, model.tripMD, {
      // checkData: ["date_time"],
      data: ({ date_time } = req.body),
    });
  },

  tripCreateCT: async (req, res) => {
    const { image, place_name, address, start_time, end_time } = req.body;
    await onResponse(req, res, model.tripCreateMD, {
      checkData: ["image", "place_name", "address", "start_time", "end_time"],
      data: {
        image,
        place_name,
        address,
        start_time,
        end_time,
        host: req.headers.host,
      },
    });
  },

  tripUpdateCT: async (req, res) => {
    const { trip_id, image, place_name, address, start_time, end_time } =
      req.body;
    await onResponse(req, res, model.tripUpdateMD, {
      checkData: [
        "trip_id",
        "image",
        "place_name",
        "address",
        "start_time",
        "end_time",
      ],
      data: {
        trip_id,
        image,
        place_name,
        address,
        start_time,
        end_time,
        host: req.headers.host,
      },
    });
  },

  tripDeleteCT: async (req, res) => {
    const ids = req.query.ids.split(",").map((id) => parseInt(id));
    await onResponse(req, res, model.tripDeleteMD, {
      data: { ids },
    });
  },
};
