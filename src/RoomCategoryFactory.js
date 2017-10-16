import { ROOM_ID } from './constants'
import SeasonPriceFactory from './SeasonPriceFactory'

const rooms = [
  {
    id: ROOM_ID.BEACHFRONT,
    label: 'Beachfront Deluxe Suite (whole)',
    maxOccupancy: 6
  },
  {
    id: ROOM_ID.BEACHFRONT_SHARING,
    label: 'Beachfront Deluxe Suite (sharing)',
    maxOccupancy: 1
  },
  {
    id: ROOM_ID.OCEAN_VIEW,
    label: 'Ocean View Deluxe (whole)',
    maxOccupancy: 4
  },
  {
    id: ROOM_ID.OCEAN_VIEW_SHARING,
    label: 'Ocean View Deluxe (sharing)',
    maxOccupancy: 1
  },
  {
    id: ROOM_ID.BEACH_HUT,
    label: 'Beach Hut (whole)',
    maxOccupancy: 4
  },
  {
    id: ROOM_ID.BEACH_HUT_SHARING,
    label: 'Beach Hut (sharing)',
    maxOccupancy: 1
  },
  {
    id: ROOM_ID.GARDEN_BATH,
    label: 'Garden Room with Bath (whole)',
    maxOccupancy: 4
  },
  {
    id: ROOM_ID.GARDEN_BATH_SHARING,
    label: 'Garden Room with Bath (sharing)',
    maxOccupancy: 1
  },
  {
    id: ROOM_ID.GARDEN_DOUBLE,
    label: 'Garden Room Double Bed (whole)',
    maxOccupancy: 4
  },
  {
    id: ROOM_ID.GARDEN_DOUBLE_SHARING,
    label: 'Garden Room Double Bed (sharing)',
    maxOccupancy: 1
  },
  {
    id: ROOM_ID.GARDEN_SINGLE,
    label: 'Garden Room Single',
    maxOccupancy: 1
  },
  {
    id: ROOM_ID.GARDEN_SHARED,
    label: 'Garden Room Shared (whole)',
    maxOccupancy: 3
  },
  {
    id: ROOM_ID.GARDEN_SHARED_SHARING,
    label: 'Garden Room Shared (sharing)',
    maxOccupancy: 1
  },
  {
    id: ROOM_ID.DORMITORY,
    label: 'Dormitory',
    maxOccupancy: 4
  },
  {
    id: ROOM_ID.TENT_HUT,
    label: 'Tent Hut',
    maxOccupancy: 2
  },
  {
    id: ROOM_ID.TENT_SPACE,
    label: 'Tent Space',
    maxOccupancy: 1
  },
  {
    id: ROOM_ID.NULL_ROOM,
    label: 'No Room (only course)',
    maxOccupancy: 1
  }
];

class AbstractRoomCategory {
  constructor(id, isSharing) {
    this.id = id
    this.isSharing = isSharing
  }

  bedCount() {
    return 2
  }

  getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
    return seasonPrice.getSingleInDoubleOccupancyRoomDiscount()
  }

  getRoomBaseRate(date, nights){
    const seasonPrice = SeasonPriceFactory.createSeasonPrice(date)
    const roomCategory = this.isSharing ? this.getRoomCategoryForShared() : this
    
    if (this.isSharing) {
      return seasonPrice.getRoomBaseRate(roomCategory.id, nights)
    } else {
      return seasonPrice.getRoomBaseRate(roomCategory.id, nights) * this.bedCount() * (100 - this.getSingleInDoubleOccupancyRoomDiscount(seasonPrice)) / 100
    }
  }
  
  // in some room categories such as GardenDoubleRoomCategory the price is taken from another room category,
  // namely: GardenSharedRoomCategory, when the room is shared.
  getRoomCategoryForShared() {
    return this 
  }
}

class AbstractSingleBedRoomCategory extends AbstractRoomCategory {
  getSingleInDoubleOccupancyRoomDiscount(seasonPrice) {
    return 0 // This is not a double occupancy room. Single occupancy discount never applies here.
  }

  bedCount() {
    return 1
  }
}

class BeachFrontRoomCategory extends AbstractRoomCategory {}
class OceanViewRoomCategory extends AbstractRoomCategory {}
class BeachHutRoomCategory extends AbstractRoomCategory {}
class GardenBathRoomCategory extends AbstractRoomCategory {}
class GardenDoubleRoomCategory extends AbstractSingleBedRoomCategory {
  getRoomCategoryForShared() {
    return RoomCategoryFactory.createRoomCategory(ROOM_ID.GARDEN_SHARED_SHARING)
  }
}
class GardenSharedRoomCategory extends AbstractRoomCategory {}
class GardenSingleRoomCategory extends AbstractSingleBedRoomCategory {}
class DormitoryRoomCategory extends AbstractSingleBedRoomCategory {}
class TentHutRoomCategory extends AbstractSingleBedRoomCategory {}
class TentSpaceRoomCategory extends AbstractSingleBedRoomCategory {}

export default class RoomCategoryFactory {
  static getRoomById(id) {
    const room =  _.find(rooms, _.matchesProperty('id', id))
    if (!room) {
      throw new Error(`Could not find a room with id: ${id}`)
    }
    return room
  };

  static filterRoomsByOccupancy(occupancy) {
    return rooms.filter(room => occupancy <= room.maxOccupancy)
  };

  static createRoomCategory(roomId, isSharing) {
    switch (roomId) {
      case ROOM_ID.BEACHFRONT: return new BeachFrontRoomCategory(ROOM_ID.BEACHFRONT, false || isSharing)
      case ROOM_ID.BEACHFRONT_SHARING: return new BeachFrontRoomCategory(ROOM_ID.BEACHFRONT, true || isSharing)
      case ROOM_ID.OCEAN_VIEW: return new OceanViewRoomCategory(ROOM_ID.OCEAN_VIEW, false || isSharing)
      case ROOM_ID.OCEAN_VIEW_SHARING: return new OceanViewRoomCategory(ROOM_ID.OCEAN_VIEW, true || isSharing)
      case ROOM_ID.BEACH_HUT: return new BeachHutRoomCategory(ROOM_ID.BEACH_HUT, false || isSharing)
      case ROOM_ID.BEACH_HUT_SHARING: return new BeachHutRoomCategory(ROOM_ID.BEACH_HUT, true || isSharing)
      case ROOM_ID.GARDEN_BATH: return new GardenBathRoomCategory(ROOM_ID.GARDEN_BATH, false || isSharing)
      case ROOM_ID.GARDEN_BATH_SHARING: return new GardenBathRoomCategory(ROOM_ID.GARDEN_BATH, true || isSharing)
      case ROOM_ID.GARDEN_DOUBLE: return new GardenDoubleRoomCategory(ROOM_ID.GARDEN_DOUBLE, false || isSharing)
      case ROOM_ID.GARDEN_DOUBLE_SHARING: return new GardenDoubleRoomCategory(ROOM_ID.GARDEN_DOUBLE, true || isSharing)
      case ROOM_ID.GARDEN_SHARED: return new GardenSharedRoomCategory(ROOM_ID.GARDEN_SHARED, false)
      case ROOM_ID.GARDEN_SHARED_SHARING: return new GardenSharedRoomCategory(ROOM_ID.GARDEN_SHARED, true || isSharing)
      case ROOM_ID.GARDEN_SINGLE: return new GardenSingleRoomCategory(ROOM_ID.GARDEN_SINGLE, false || isSharing)
      case ROOM_ID.DORMITORY: return new DormitoryRoomCategory(ROOM_ID.DORMITORY, false || isSharing)
      case ROOM_ID.TENT_HUT: return new TentHutRoomCategory(ROOM_ID.TENT_HUT, false || isSharing)
      case ROOM_ID.TENT_SPACE: return new TentSpaceRoomCategory(ROOM_ID.TENT_SPACE, false || isSharing)
      case ROOM_ID.NULL_ROOM: return new TentSpaceRoomCategory(ROOM_ID.NULL_ROOM, false || isSharing)
      default: throw new Error(`Invalid roomId: "${roomId}"`)
    }
  };
}
