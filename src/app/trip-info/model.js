const { TripInfo } = require("./config");
const fs = require("fs");
const { throwError, deleteFiles, getFileName } = require("../../utils/index");
const { formatDate } = require("../../utils/convert");
require("dotenv").config();

module.exports = {
  tripMD: async () => {
    try {
      const tripInfo = await TripInfo.findAll();
      return tripInfo.map((item) => {
        const timeStart = formatDate(item?.start_time, true, true).split(":");
        const timeEnd = formatDate(item?.end_time, true, true).split(":");
        const totalActive = `${
          +timeEnd[0] - +timeStart[0] === 0 ? "00" : +timeEnd[0] - +timeStart[0]
        }:${
          timeEnd[1] - timeStart[1] === 0 ? "00" : +timeEnd[0] - +timeStart[0]
        }`;
        const timeActive = totalActive.split(":");
        return {
          trip_id: 1,
          image: item?.image,
          place_name: item?.place_name,
          address: item?.address,
          start_time: formatDate(item?.start_time, true),
          end_time: formatDate(item?.end_time, true),
          coordinates: {
            widthStart: `${+timeStart[0] * 60 + +timeStart[1]}px`,
            widthActive: `${+timeActive[0] * 60 + +timeActive[1]}px`,
          },
          created_at: item?.created_at,
          updated_at: item?.updated_at,
        };
      });
    } catch (error) {
      throw error;
    }
  },

  tripCreateMD: async ({
    image,
    place_name,
    address,
    start_time,
    end_time,
    host,
  }) => {
    try {
      const imageBuffer = Buffer.from(image.split(",")[1], "base64");
      const typeImage = image.split(";")[0].split("/")[1];
      const imagePath = `uploads/${Date.now()}.${typeImage}`;

      await TripInfo.create({
        image: `http://${host}/${imagePath}`,
        place_name,
        address,
        start_time,
        end_time,
      });

      fs.writeFileSync(imagePath, imageBuffer);

      return "Tạo mới liệu thành công!";
    } catch (error) {
      throw error;
    }
  },

  tripUpdateMD: async ({
    trip_id,
    image,
    place_name,
    address,
    start_time,
    end_time,
    host,
  }) => {
    try {
      const imageBuffer = Buffer.from(image.split(",")[1], "base64");
      const typeImage = image.split(";")[0].split("/")[1];
      const imagePath = `uploads/${Date.now()}.${typeImage}`;

      const tripInfo = await TripInfo.findOne({ where: { trip_id } });

      if (!tripInfo) {
        throwError(201, `Không tồn tại chuyến đi có id là: ${trip_id}!`);
      }

      fs.unlinkSync(`uploads/${getFileName(tripInfo.image)}`);

      await TripInfo.update(
        {
          image: `http://${host}/${imagePath}`,
          place_name,
          address,
          start_time,
          end_time,
        },
        { where: { trip_id } }
      );

      fs.writeFileSync(imagePath, imageBuffer);

      return "Cập nhật liệu thành công!";
    } catch (error) {
      throw error;
    }
  },

  tripDeleteMD: async ({ ids }) => {
    try {
      for (const id of ids) {
        const tripInfo = await TripInfo.findOne({ where: { trip_id: id } });
        if (tripInfo) {
          fs.unlinkSync(`uploads/${getFileName(tripInfo.image)}`);
          await TripInfo.destroy({ where: { trip_id: id } });
        } else {
          throwError(201, `Không tìm thấy chuyến đi có id là: ${id}`);
        }
      }

      return "Xóa chuyến đi thành công!";
    } catch (error) {
      throw error;
    }
  },
};
