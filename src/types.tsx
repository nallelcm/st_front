export interface Meta {
  total: number;
  page: number;
  limit: number;
}
export interface AgentData {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: number;
}
export interface Ship {
  symbol: string;
  registration: ShipRegistration;
  nav: ShipNav;
  crew: ShipCrew;
  frame: ShipFrame;
  reactor: ShipReactor;
  engine: ShipEngine;
  cooldown: Cooldown;
  modules: ShipModule[];
  mounts: ShipMount[];
  cargo: ShipCargo;
  fuel: ShipFuel;
}
export interface ShipNav {
  systemSymbol: string;
  waypointSymbol: string;
  route: ShipNavRoute;
  status: ShipStatusType;
  flightMode: FlightModeType;
}
export interface SystemWaypoint {
  symbol: string;
  type: string;
  x: number;
  y: number;
  orbitals: SystemWaypointOrbital[];
  orbits: string;
}
export interface SystemWaypointOrbital {
  symbol: string;
}
export interface ShipNavRoute {
  destination: SystemWaypoint;
  origin: SystemWaypoint;
  departureTime: Date;
  arrival: Date;
}
export interface ShipCrew {
  current: number;
  required: number;
  capacity: number;
  rotation: CrewRotationType;
  morale: number;
  wages: number;
}
export interface ShipRequirements {
  power: number;
  crew: number;
  slots: number;
}
export interface ShipFrame {
  symbol: ShipFrameType;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  requirements: ShipRequirements;
}
export interface ShipReactor {
  symbol: ShipReactorType;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  powerOutput: number;
  requirements: ShipRequirements;
}
export interface ShipEngine {
  symbol: ShipEngineType;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  speed: number;
  requirements: ShipRequirements;
}
export interface Cooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
  expiration: Date;
}
export interface ShipModule {
  symbol: ShipModuleType;
  capacity: number;
  range: number;
  name: string;
  description: string;
  requirements: ShipRequirements;
}
export interface ShipMount {
  symbol: ShipMountType;
  name: string;
  description: string;
  strength: number;
  deposits: ShipMountDepositeType[];
  requirements: ShipRequirements;
}
export interface ShipCargoItem {
  symbol: CargoInventoryItemType;
  name: string;
  description: string;
  units: number;
}
export interface ShipCargo {
  capacity: number;
  units: number;
  inventory: ShipCargoItem[];
}
export interface ShipFuel {
  current: number;
  capacity: number;
  consumed: {
    amount: number;
    timestamp: string;
  };
}
export interface ContractPayment {
  onAccepted: number;
  onFullfilled: number;
}
export interface ContractDeliverGood {
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFullfilled: number;
}
export interface ContractTerms {
  deadline: Date;
  payment: ContractPayment;
  deliver: ContractDeliverGood[];
}
export interface Contract {
  id: string;
  factionSymbol: string;
  type: ContractType;
  terms: ContractTerms;
  accepted: boolean;
  fullfilled: boolean;
  expiration: Date;
  deadlineToAccept: Date;
}
export interface ShipRegistration {
  name: string;
  factionSymbol: string;
  role: ShipRoleType;
}
export interface FleetResponse {
  ships: Ship[];
  meta: Meta;
}
export interface ContractResponse {
  contracts: Contract[];
  meta: Meta;
}
export interface SpaceTraderDateInfo {
  date: Date;
  remainingTime: string;
  formattedDateTime: string;
}

/* 

ENUMS

*/

export enum FlightModeType {
  DRIFT = "DRIFT",
  STEALTH = "STEALTH",
  CRUISE = "CRUISE",
  BURN = "BURN",
}
export enum ShipStatusType {
  IN_TRANSIT = "IN_TRANSIT",
  DOCKED = "DOCKED",
  IN_ORBIT = "IN_ORBIT",
}
export enum ShipRoleType {
  FABRICATOR = "FABRICATOR",
  HARVESTER = "HARVESTER",
  HAULER = "HAULER",
  INTERCEPTOR = "INTERCEPTOR",
  EXCAVATOR = "EXCAVATOR",
  TRANSPORT = "TRANSPORT",
  REPAIR = "REPAIR",
  SURVEYOR = "SURVEYOR",
  COMMAND = "COMMAND",
  CARRIER = "CARRIER",
  PATROL = "PATROL",
  SATELLITE = "SATELLITE",
  EXPLORER = "EXPLORER",
  REFINERY = "REFINERY",
}
export enum CrewRotationType {
  STRICT = "STRICT",
  RELAXED = "RELAXED",
}
export enum ShipFrameType {
  PROBE = "FRAME_PROBE",
  DRONE = "FRAME_DRONE",
  INTERCEPTOR = "FRAME_INTERCEPTOR",
  RACER = "FRAME_RACER",
  FIGHTER = "FRAME_FIGHTER",
  FRIGATE = "FRAME_FRIGATE",
  SHUTTLE = "FRAME_SHUTTLE",
  EXPLORER = "FRAME_EXPLORER",
  MINER = "FRAME_MINER",
  LIGHT_FREIGHTER = "FRAME_LIGHT_FREIGHTER",
  HEAVY_FREIGHTER = "FRAME_HEAVY_FREIGHTER",
  TRANSPORT = "FRAME_TRANSPORT",
  DESTROYER = "FRAME_DESTROYER",
  CRUISER = "FRAME_CRUISER",
  CARRIER = "FRAME_CARRIER",
}
export enum ShipReactorType {
  SOLAR_I = "REACTOR_SOLAR_I",
  FUSION_I = "REACTOR_FUSION_I",
  FISSION_I = "REACTOR_FISSION_I",
  ANTIMATTER_I = "REACTOR_ANTIMATTER_I",
  CHEMICAL_I = "REACTOR_CHEMICAL_I",
}
export enum ShipEngineType {
  IMPULSE_I = "ENGINE_IMPULSE_DRIVE_I",
  ION_I = "ENGINE_ION_DRIVE_I",
  ION_II = "ENGINE_ION_DRIVE_II",
  HYPER_I = "ENGINE_HYPER_DRIVE_I",
}
export enum ShipModuleType {
  MINERAL_PROCESSOR_I = "MODULE_MINERAL_PROCESSOR_I",
  GAS_PROCESSOR_I = "MODULE_GAS_PROCESSOR_I",
  CARGO_HOLD_I = "MODULE_CARGO_HOLD_I",
  CARGO_HOLD_II = "MODULE_CARGO_HOLD_II",
  CARGO_HOLD_III = "MODULE_CARGO_HOLD_III",
  CREW_QUARTERS_I = "MODULE_CREW_QUARTERS_I",
  ENVOY_QUARTERS_I = "MODULE_ENVOY_QUARTERS_I",
  PASSENGER_CABIN_I = "MODULE_PASSENGER_CABIN_I",
  MICRO_REFINERY_I = "MODULE_MICRO_REFINERY_I",
  ORE_REFINERY_I = "MODULE_ORE_REFINERY_I",
  FUEL_REFINERY_I = "MODULE_FUEL_REFINERY_I",
  SCIENCE_LAB_I = "MODULE_SCIENCE_LAB_I",
  JUMP_DRIVE_I = "MODULE_JUMP_DRIVE_I",
  JUMP_DRIVE_II = "MODULE_JUMP_DRIVE_II",
  JUMP_DRIVE_III = "MODULE_JUMP_DRIVE_III",
  WARP_DRIVE_I = "MODULE_WARP_DRIVE_I",
  WARP_DRIVE_II = "MODULE_WARP_DRIVE_II",
  WARP_DRIVE_III = "MODULE_WARP_DRIVE_III",
  SHIELD_GENERATOR_I = "MODULE_SHIELD_GENERATOR_I",
  SHIELD_GENERATOR_II = "MODULE_SHIELD_GENERATOR_II",
}
export enum ShipMountType {
  GAS_SIPHON_I = "MOUNT_GAS_SIPHON_I",
  GAS_SIPHON_II = "MOUNT_GAS_SIPHON_II",
  GAS_SIPHON_III = "MOUNT_GAS_SIPHON_III",
  SURVEYOR_I = "MOUNT_SURVEYOR_I",
  SURVEYOR_II = "MOUNT_SURVEYOR_II",
  SURVEYOR_III = "MOUNT_SURVEYOR_III",
  SENSOR_ARRAY_I = "MOUNT_SENSOR_ARRAY_I",
  SENSOR_ARRAY_II = "MOUNT_SENSOR_ARRAY_II",
  SENSOR_ARRAY_III = "MOUNT_SENSOR_ARRAY_III",
  MINING_LASER_I = "MOUNT_MINING_LASER_I",
  MINING_LASER_II = "MOUNT_MINING_LASER_II",
  MINING_LASER_III = "MOUNT_MINING_LASER_III",
  LASER_CANNON_I = "MOUNT_LASER_CANNON_I",
  MISSILE_LAUNCHER_I = "MOUNT_MISSILE_LAUNCHER_I",
  TURRET_I = "MOUNT_TURRET_I",
}
export enum ShipMountDepositeType {
  QUARTZ_SAND = "QUARTZ_SAND",
  SILICON_CRYSTALS = "SILICON_CRYSTALS",
  PRECIOUS_STONES = "PRECIOUS_STONES",
  ICE_WATER = "ICE_WATER",
  AMMONIA_ICE = "AMMONIA_ICE",
  IRON_ORE = "IRON_ORE",
  COPPER_ORE = "COPPER_ORE",
  SILVER_ORE = "SILVER_ORE",
  ALUMINUM_ORE = "ALUMINUM_ORE",
  GOLD_ORE = "GOLD_ORE",
  PLATINUM_ORE = "PLATINUM_ORE",
  DIAMONDS = "DIAMONDS",
  URANITE_ORE = "URANITE_ORE",
  MERITIUM_ORE = "MERITIUM_ORE",
}
enum CargoInventoryItemType {
  PRECIOUS_STONES = "PRECIOUS_STONES",
  QUARTZ_SAND = "QUARTZ_SAND",
  SILICON_CRYSTALS = "SILICON_CRYSTALS",
  AMMONIA_ICE = "AMMONIA_ICE",
  LIQUID_HYDROGEN = "LIQUID_HYDROGEN",
  LIQUID_NITROGEN = "LIQUID_NITROGEN",
  ICE_WATER = "ICE_WATER",
  EXOTIC_MATTER = "EXOTIC_MATTER",
  ADVANCED_CIRCUITRY = "ADVANCED_CIRCUITRY",
  GRAVITON_EMITTERS = "GRAVITON_EMITTERS",
  IRON = "IRON",
  IRON_ORE = "IRON_ORE",
  COPPER = "COPPER",
  COPPER_ORE = "COPPER_ORE",
  ALUMINUM = "ALUMINUM",
  ALUMINUM_ORE = "ALUMINUM_ORE",
  SILVER = "SILVER",
  SILVER_ORE = "SILVER_ORE",
  GOLD = "GOLD",
  GOLD_ORE = "GOLD_ORE",
  PLATINUM = "PLATINUM",
  PLATINUM_ORE = "PLATINUM_ORE",
  DIAMONDS = "DIAMONDS",
  URANITE = "URANITE",
  URANITE_ORE = "URANITE_ORE",
  MERITIUM = "MERITIUM",
  MERITIUM_ORE = "MERITIUM_ORE",
  HYDROCARBON = "HYDROCARBON",
  ANTIMATTER = "ANTIMATTER",
  FAB_MATS = "FAB_MATS",
  FERTILIZERS = "FERTILIZERS",
  FABRICS = "FABRICS",
  FOOD = "FOOD",
  JEWELRY = "JEWELRY",
  MACHINERY = "MACHINERY",
  FIREARMS = "FIREARMS",
  ASSAULT_RIFLES = "ASSAULT_RIFLES",
  MILITARY_EQUIPMENT = "MILITARY_EQUIPMENT",
  EXPLOSIVES = "EXPLOSIVES",
  LAB_INSTRUMENTS = "LAB_INSTRUMENTS",
  AMMUNITION = "AMMUNITION",
  ELECTRONICS = "ELECTRONICS",
  SHIP_PLATING = "SHIP_PLATING",
  SHIP_PARTS = "SHIP_PARTS",
  EQUIPMENT = "EQUIPMENT",
  FUEL = "FUEL",
  MEDICINE = "MEDICINE",
  DRUGS = "DRUGS",
  CLOTHING = "CLOTHING",
  MICROPROCESSORS = "MICROPROCESSORS",
  PLASTICS = "PLASTICS",
  POLYNUCLEOTIDES = "POLYNUCLEOTIDES",
  BIOCOMPOSITES = "BIOCOMPOSITES",
  QUANTUM_STABILIZERS = "QUANTUM_STABILIZERS",
  NANOBOTS = "NANOBOTS",
  AI_MAINFRAMES = "AI_MAINFRAMES",
  QUANTUM_DRIVES = "QUANTUM_DRIVES",
  ROBOTIC_DRONES = "ROBOTIC_DRONES",
  CYBER_IMPLANTS = "CYBER_IMPLANTS",
  GENE_THERAPEUTICS = "GENE_THERAPEUTICS",
  NEURAL_CHIPS = "NEURAL_CHIPS",
  MOOD_REGULATORS = "MOOD_REGULATORS",
  VIRAL_AGENTS = "VIRAL_AGENTS",
  MICRO_FUSION_GENERATORS = "MICRO_FUSION_GENERATORS",
  SUPERGRAINS = "SUPERGRAINS",
  LASER_RIFLES = "LASER_RIFLES",
  HOLOGRAPHICS = "HOLOGRAPHICS",
  SHIP_SALVAGE = "SHIP_SALVAGE",
  RELIC_TECH = "RELIC_TECH",
  NOVEL_LIFEFORMS = "NOVEL_LIFEFORMS",
  BOTANICAL_SPECIMENS = "BOTANICAL_SPECIMENS",
  CULTURAL_ARTIFACTS = "CULTURAL_ARTIFACTS",
  FRAME_PROBE = "FRAME_PROBE",
  FRAME_DRONE = "FRAME_DRONE",
  FRAME_INTERCEPTOR = "FRAME_INTERCEPTOR",
  FRAME_RACER = "FRAME_RACER",
  FRAME_FIGHTER = "FRAME_FIGHTER",
  FRAME_FRIGATE = "FRAME_FRIGATE",
  FRAME_SHUTTLE = "FRAME_SHUTTLE",
  FRAME_EXPLORER = "FRAME_EXPLORER",
  FRAME_MINER = "FRAME_MINER",
  FRAME_LIGHT_FREIGHTER = "FRAME_LIGHT_FREIGHTER",
  FRAME_HEAVY_FREIGHTER = "FRAME_HEAVY_FREIGHTER",
  FRAME_TRANSPORT = "FRAME_TRANSPORT",
  FRAME_DESTROYER = "FRAME_DESTROYER",
  FRAME_CRUISER = "FRAME_CRUISER",
  FRAME_CARRIER = "FRAME_CARRIER",
  REACTOR_SOLAR_I = "REACTOR_SOLAR_I",
  REACTOR_FUSION_I = "REACTOR_FUSION_I",
  REACTOR_FISSION_I = "REACTOR_FISSION_I",
  REACTOR_CHEMICAL_I = "REACTOR_CHEMICAL_I",
  REACTOR_ANTIMATTER_I = "REACTOR_ANTIMATTER_I",
  ENGINE_IMPULSE_DRIVE_I = "ENGINE_IMPULSE_DRIVE_I",
  ENGINE_ION_DRIVE_I = "ENGINE_ION_DRIVE_I",
  ENGINE_ION_DRIVE_II = "ENGINE_ION_DRIVE_II",
  ENGINE_HYPER_DRIVE_I = "ENGINE_HYPER_DRIVE_I",
  MODULE_MINERAL_PROCESSOR_I = "MODULE_MINERAL_PROCESSOR_I",
  MODULE_GAS_PROCESSOR_I = "MODULE_GAS_PROCESSOR_I",
  MODULE_CARGO_HOLD_I = "MODULE_CARGO_HOLD_I",
  MODULE_CARGO_HOLD_II = "MODULE_CARGO_HOLD_II",
  MODULE_CARGO_HOLD_III = "MODULE_CARGO_HOLD_III",
  MODULE_CREW_QUARTERS_I = "MODULE_CREW_QUARTERS_I",
  MODULE_ENVOY_QUARTERS_I = "MODULE_ENVOY_QUARTERS_I",
  MODULE_PASSENGER_CABIN_I = "MODULE_PASSENGER_CABIN_I",
  MODULE_MICRO_REFINERY_I = "MODULE_MICRO_REFINERY_I",
  MODULE_SCIENCE_LAB_I = "MODULE_SCIENCE_LAB_I",
  MODULE_JUMP_DRIVE_I = "MODULE_JUMP_DRIVE_I",
  MODULE_JUMP_DRIVE_II = "MODULE_JUMP_DRIVE_II",
  MODULE_JUMP_DRIVE_III = "MODULE_JUMP_DRIVE_III",
  MODULE_WARP_DRIVE_I = "MODULE_WARP_DRIVE_I",
  MODULE_WARP_DRIVE_II = "MODULE_WARP_DRIVE_II",
  MODULE_WARP_DRIVE_III = "MODULE_WARP_DRIVE_III",
  MODULE_SHIELD_GENERATOR_I = "MODULE_SHIELD_GENERATOR_I",
  MODULE_SHIELD_GENERATOR_II = "MODULE_SHIELD_GENERATOR_II",
  MODULE_ORE_REFINERY_I = "MODULE_ORE_REFINERY_I",
  MODULE_FUEL_REFINERY_I = "MODULE_FUEL_REFINERY_I",
  MOUNT_GAS_SIPHON_I = "MOUNT_GAS_SIPHON_I",
  MOUNT_GAS_SIPHON_II = "MOUNT_GAS_SIPHON_II",
  MOUNT_GAS_SIPHON_III = "MOUNT_GAS_SIPHON_III",
  MOUNT_SURVEYOR_I = "MOUNT_SURVEYOR_I",
  MOUNT_SURVEYOR_II = "MOUNT_SURVEYOR_II",
  MOUNT_SURVEYOR_III = "MOUNT_SURVEYOR_III",
  MOUNT_SENSOR_ARRAY_I = "MOUNT_SENSOR_ARRAY_I",
  MOUNT_SENSOR_ARRAY_II = "MOUNT_SENSOR_ARRAY_II",
  MOUNT_SENSOR_ARRAY_III = "MOUNT_SENSOR_ARRAY_III",
  MOUNT_MINING_LASER_I = "MOUNT_MINING_LASER_I",
  MOUNT_MINING_LASER_II = "MOUNT_MINING_LASER_II",
  MOUNT_MINING_LASER_III = "MOUNT_MINING_LASER_III",
  MOUNT_LASER_CANNON_I = "MOUNT_LASER_CANNON_I",
  MOUNT_MISSILE_LAUNCHER_I = "MOUNT_MISSILE_LAUNCHER_I",
  MOUNT_TURRET_I = "MOUNT_TURRET_I",
  SHIP_PROBE = "SHIP_PROBE",
  SHIP_MINING_DRONE = "SHIP_MINING_DRONE",
  SHIP_SIPHON_DRONE = "SHIP_SIPHON_DRONE",
  SHIP_INTERCEPTOR = "SHIP_INTERCEPTOR",
  SHIP_LIGHT_HAULER = "SHIP_LIGHT_HAULER",
  SHIP_COMMAND_FRIGATE = "SHIP_COMMAND_FRIGATE",
  SHIP_EXPLORER = "SHIP_EXPLORER",
  SHIP_HEAVY_FREIGHTER = "SHIP_HEAVY_FREIGHTER",
  SHIP_LIGHT_SHUTTLE = "SHIP_LIGHT_SHUTTLE",
  SHIP_ORE_HOUND = "SHIP_ORE_HOUND",
  SHIP_REFINING_FREIGHTER = "SHIP_REFINING_FREIGHTER",
  SHIP_SURVEYOR = "SHIP_SURVEYOR",
}
export enum SystemType {
  PLANET = "PLANET",
  GAS_GIANT = "GAS_GIANT",
  MOON = "MOON",
  ORBITAL_STATION = "ORBITAL_STATION",
  JUMP_GATE = "JUMP_GATE",
  ASTEROID_FIELD = "ASTEROID_FIELD",
  ASTEROID = "ASTEROID",
  ENGINEERED_ASTEROID = "ENGINEERED_ASTEROID",
  ASTEROID_BASE = "ASTEROID_BASE",
  NEBULA = "NEBULA",
  DEBRIS_FIELD = "DEBRIS_FIELD",
  GRAVITY_WELL = "GRAVITY_WELL",
  ARTIFICIAL_GRAVITY_WELL = "ARTIFICIAL_GRAVITY_WELL",
  FUEL_STATION = "FUEL_STATION",
}
export enum ContractType {
  PROCUREMENT = "PROCUREMENT",
  TRANSPORT = "TRANSPORT",
  SHUTTLE = "SHUTTLE",
}
