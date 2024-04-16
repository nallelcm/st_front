/* Meta
{
  "total": 6,
  "page": 1,
  "limit": 20
}
*/
export interface Meta {
  total: number;
  page: number;
  limit: number;
}
/* AgentData
{
  "accountId": "string",
  "symbol": "string",
  "headquarters": "string",
  "credits": 0,
  "startingFaction": "string",
  "shipCount": 0
}
*/
export interface AgentData {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: number;
}
/*
{ Ship
  "symbol": "string",
  "registration": ShipRegistration,
  "nav": ShipNav,
  "crew": ShipCrew,
  "frame": ShipFrame,
  "reactor": ShipReactor,
  "engine": ShipEngine,
  "cooldown": Cooldown,
  "modules": [ShipModule],
  "mounts": [ShipMount],
  "cargo": ShipCargo,
  "fuel": ShipFuel
}
*/
export interface Ship {
  symbol: string;
  registration: ShipRegistration;
  nav: ShipNav;
  crew: ShipCrew;
  frame: ShipFrame;
  reactor: ShipReactor;
  engine: ShipEngine;
  cooldown: Cooldown;
  modules: [ShipModule];
  mounts: [ShipMount];
  cargo: ShipCargo;
  fuel: ShipFuel;
}

/* ShipNav
{
  "systemSymbol": "string",
  "waypointSymbol": "string",
  "route": ShipNavRoute,
  "status": "IN_TRANSIT",
  "flightMode": "CRUISE"
}
*/
export interface ShipNav {
  systemSymbol: string;
  waypointSymbol: string;
  route: ShipNavRoute;
  status: string;
  flightMode: string;
}
/* SystemWaypoint
{
  "symbol": "string",
  "type": "PLANET",
  "x": 0,
  "y": 0,
  "orbitals": [
    {
      "symbol": "string"
    }
  ],
  "orbits": "string"
}
*/
export interface SystemWaypoint {
  symbol: string;
  type: string;
  x: number;
  y: number;
  orbitals: [
    {
      symbol: string;
    }
  ];
  orbits: string;
}
/* ShipNavRoute
{
  "destination": SystemWaypoint,
  "origin": SystemWaypoint,
  "departureTime": "2019-08-24T14:15:22Z",
  "arrival": "2019-08-24T14:15:22Z"
}
*/
export interface ShipNavRoute {
  destination: SystemWaypoint;
  origin: SystemWaypoint;
  departureTime: string;
  arrival: string;
}
/* ShipCrew
{
  "current": 0,
  "required": 0,
  "capacity": 0,
  "rotation": "STRICT",
  "morale": 0,
  "wages": 0
}
*/
export interface ShipCrew {
  current: number;
  required: number;
  capacity: number;
  rotation: string;
  morale: number;
  wages: number;
}

/* ShipRequirements
{
  "power": 0,
  "crew": 0,
  "slots": 0
}
*/
export interface ShipRequirements {
  power: number;
  crew: number;
  slots: number;
}

/* ShipFrame
{
  "symbol": "FRAME_PROBE",
  "name": "string",
  "description": "string",
  "condition": 0,
  "integrity": 0,
  "moduleSlots": 0,
  "mountingPoints": 0,
  "fuelCapacity": 0,
  "requirements": ShipRequirements
}
*/
export interface ShipFrame {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  requirements: ShipRequirements;
}
/* ShipReactor
{
  "symbol": "REACTOR_SOLAR_I",
  "name": "string",
  "description": "string",
  "condition": 0,
  "integrity": 0,
  "powerOutput": 1,
  "requirements": ShipRequirements
}
*/
export interface ShipReactor {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  powerOutput: number;
  requirements: ShipRequirements;
}
/* ShipEngine
{
  "symbol": "ENGINE_IMPULSE_DRIVE_I",
  "name": "string",
  "description": "string",
  "condition": 0,
  "integrity": 0,
  "speed": 1,
  "requirements": ShipRequirements
}
*/
export interface ShipEngine {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  speed: number;
  requirements: ShipRequirements;
}
/* Cooldown
{
  "shipSymbol": "string",
  "totalSeconds": 0,
  "remainingSeconds": 0,
  "expiration": "2019-08-24T14:15:22Z"
}
*/
export interface Cooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
  expiration: string;
}
/* ShipModule
{
  "symbol": "MODULE_MINERAL_PROCESSOR_I",
  "capacity": 0,
  "range": 0,
  "name": "string",
  "description": "string",
  "requirements": ShipRequirements
}
*/
export interface ShipModule {
  symbol: string;
  capacity: number;
  range: number;
  name: string;
  description: string;
  requirements: ShipRequirements;
}
/* ShipMount
{
  "symbol": "MOUNT_GAS_SIPHON_I",
  "name": "string",
  "description": "string",
  "strength": 0,
  "deposits": [
    "QUARTZ_SAND"
  ],
  "requirements": ShipRequirements
} */
export interface ShipMount {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  deposits: [string];
  requirements: ShipRequirements;
}
/* ShipCargoItem
{
  "symbol": "PRECIOUS_STONES",
  "name": "string",
  "description": "string",
  "units": 1
}
*/
export interface ShipCargoItem {
  symbol: string;
  name: string;
  description: string;
  units: number;
}
/* ShipCargo
{
  "capacity": 0,
  "units": 0,
  "inventory": [
    {
      "symbol": "PRECIOUS_STONES",
      "name": "string",
      "description": "string",
      "units": 1
    }
  ]
}
*/
export interface ShipCargo {
  capacity: number;
  units: number;
  inventory: [ShipCargoItem];
}

/* ShipFuel
{
  "current": 0,
  "capacity": 0,
  "consumed": {
    "amount": 0,
    "timestamp": "2019-08-24T14:15:22Z"
  }
}
*/
export interface ShipFuel {
  current: number;
  capacity: number;
  consumed: {
    amount: number;
    timestamp: string;
  };
}
/* ShipRegistration
{
  "name": "string",
  "factionSymbol": "string",
  "role": "FABRICATOR"
}
*/
export interface ShipRegistration {
  name: string;
  factionSymbol: string;
  role: string;
}

export interface FleetResponse {
  ships: Ship[];
  meta: Meta;
}
